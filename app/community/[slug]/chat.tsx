import { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { GiftedChat, type IMessage } from 'react-native-gifted-chat'
import { View } from 'tamagui'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import useAuthStore from '@/state/authStore'
import { useLocalSearchParams } from 'expo-router'
import { client } from '@/lib/axios'
export default function CommunityChat() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const { slug } = useLocalSearchParams()

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${process.env.EXPO_PUBLIC_CHAT_WEBSOCKET_URL}/${slug}`,
    {
      queryParams: {
        session: `Bearer ${token || ''}`,
      },
    },
  )

  useEffect(() => {
    ;(async () => {
      const m = await client.get(`/message/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMessages(m.data.data)
    })()
  }, [slug])

  // Update the chat with the last message received
  useEffect(() => {
    if (lastMessage) {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [JSON.parse(lastMessage.data).message]),
      )
    }
  }, [lastMessage])

  const onSend = useCallback(
    (messages: IMessage[] = []) => {
      if (readyState === ReadyState.OPEN) {
        sendMessage(JSON.stringify({ message: messages[0], community: slug }))
      }
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages, readyState],
  )

  if (!user) return null

  return (
    <SafeAreaView>
      <View h="100%">
        <GiftedChat
          messages={messages}
          renderUsernameOnMessage
          onSend={(messages) => onSend(messages)}
          renderAvatar={null}
          user={{
            _id: user.id,
            name: user.profile.fullName,
            // avatar: user.profile.profilePicture,
          }}
        />
      </View>
    </SafeAreaView>
  )
}
