import { ChevronDown } from '@tamagui/lucide-icons'
import { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { GiftedChat, type IMessage } from 'react-native-gifted-chat'
import { Accordion, Paragraph, Square, View } from 'tamagui'
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

  useEffect(() => {
    if (lastMessage) {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [JSON.parse(lastMessage.data).message]),
      )
    }
  }, [lastMessage])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'This is a system message',
        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        system: true,
        user: {
          _id: 1,
        },
        // Any additional custom parameters are passed through
      },
    ])
  }, [])

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
        <Accordion overflow="hidden" type="multiple" w="100%">
          <Accordion.Item value="a1" position="relative">
            <Accordion.Trigger flexDirection="row" justifyContent="space-between">
              {({
                open,
              }: {
                open: boolean
              }) => (
                <>
                  <Paragraph>1. Take a cold shower</Paragraph>
                  <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                    <ChevronDown size="$1" />
                  </Square>
                </>
              )}
            </Accordion.Trigger>
            <Accordion.HeightAnimator animation="medium">
              <Accordion.Content
                animation="medium"
                position="absolute"
                exitStyle={{ opacity: 0 }}
              >
                <Paragraph>
                  Cold showers can help reduce inflammation, relieve pain, improve
                  circulation, lower stress levels, and reduce muscle soreness and
                  fatigue.
                </Paragraph>
              </Accordion.Content>
            </Accordion.HeightAnimator>
          </Accordion.Item>
        </Accordion>
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
          textInputProps={{}}
        />
      </View>
    </SafeAreaView>
  )
}
