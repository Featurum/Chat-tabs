import CONSTANS from '@/constans/'
import {mapActions, mapGetters} from 'vuex'

import input from '../components/input/'
import message from '../components/message/'

export default {
    components: {
        'v-chat-input': input,
        'v-chat-message': message
    },

    data: () => ({

    }),

    computed: {
        ...mapGetters({
            listMessages: 'chat/listMessages'
        }),
    },

    methods: {
    	...mapActions({
	      	getListMessages: 'chat/getListMessages',
            getMessage: 'chat/getMessage',
            saveMessage: 'chat/saveMessage',
            reSendMessage: 'chat/reSendMessage',
            markMessage: 'chat/markMessage'
	    }),

        newMessage(data) {
            this.saveMessage(data)
            this.$nextTick(() => {
                this.scrollBottom()
            })
        },

        /* Получение эвента нового сообщения */
        receivingMessages() {
            let scrollBottom = false

            try {
                let list = this.$refs.list
                if (list && list.scrollHeight <= list.scrollTop + list.offsetHeight) {
                    scrollBottom = true
                }
            } catch(_) {
                scrollBottom = false
            }

            if (event.key === CONSTANS.STORAGE_NEW_MESSAGE && event.newValue) {
                this.$nextTick(() => {
                    this.getMessage(event.newValue)
                })

                if (scrollBottom) {
                    this.scrollBottom()
                }
            }
            if(event.key === CONSTANS.STORAGE_MARK_MESSAGE && event.newValue) {
                this.$store.commit('chat/markMessage', +event.newValue)
            }
        },

        scrollBottom() {
            this.$nextTick(() => {
                let list = this.$refs.list;
                list.scrollTop = list.scrollHeight;
            })
        }
    },

    created() {
        this.getListMessages()
        window.addEventListener('storage', this.receivingMessages)
    },

    mounted() {
        this.scrollBottom()
    },

    destroy() {
        window.removeEventListener('storage', this.receivingMessages)
    }
}
