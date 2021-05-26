import CONSTANS from '@/constans/'
import { getUser } from '@/functions/auth.js'

const getMessages = () => {
    try {
        return JSON.parse(localStorage.getItem(CONSTANS.STORAGE_LIST_MESSAGES) || "[]")
    } catch(_) {
        localStorage.removeItem(CONSTANS.STORAGE_LIST_MESSAGES)
        return []
    }
}

const sendMessage = (message) => {
    return new Promise(async (resolve) => {
        setTimeout(() => {
            let list = getMessages()
            let newMessage = {
                id: list.length + 1,
                status: CONSTANS.STATUSES_MESSAGES.GOOD,
                text: message.text,
                date: message.date,
                autor: message.autor
            }
            list.push(newMessage)
            localStorage.setItem(CONSTANS.STORAGE_LIST_MESSAGES, JSON.stringify(list))

            let randomCrash = Math.floor(Math.random() * 4) >= 3

            if(randomCrash) {
                resolve({ error: true })
            } else {
                resolve(newMessage)
            }
        }, Math.floor(Math.random() * 5) * 1000)
    })
}

const markMessage = (id) => {
    return new Promise(async (resolve) => {
        let list = getMessages()
        list = list.map(item => {
            if(item.id === +id) {
                item.status = CONSTANS.STATUSES_MESSAGES.MARK
            }
            return item
        })
        localStorage.setItem(CONSTANS.STORAGE_LIST_MESSAGES, JSON.stringify(list))
        resolve(true)
    })
}

const markMessageList = (messageIds) => {
    return new Promise(async (resolve) => {
        let list = getMessages()
        list = list.map(item => {
            if(messageIds.indexOf(item.id) !== -1) {
                item.status = CONSTANS.STATUSES_MESSAGES.MARK
            }
            return item
        })

        localStorage.setItem(CONSTANS.STORAGE_LIST_MESSAGES, JSON.stringify(list))
        resolve(true)
    })
}

const actions = {
    getListMessages: function ({commit}) {
        return new Promise(async(resolve) => {
            let list = getMessages()
            let withoutMark = list.filter(mes => {
                return mes.status === CONSTANS.STATUSES_MESSAGES.GOOD && mes.autor !== getUser()
            }).map(mes => mes.id)

            if(withoutMark && withoutMark.length) {
                let result = await markMessageList(withoutMark)
                if(result) {
                    list = list.map(mes => {
                        if(withoutMark.indexOf(mes.id) !== -1) {
                            mes.status = CONSTANS.STATUSES_MESSAGES.MARK
                            localStorage.setItem(CONSTANS.STORAGE_MARK_MESSAGE, mes.id)
                        }

                        return mes
                    })
                }
            }

            commit('setListMessages', list)
            resolve(true)
        })
    },

    getMessage: function ({commit}, id) {
        return new Promise(async (resolve) => {
            let list = getMessages()
            let newMessage = list.find(item => item.id == +id)
            commit('setMessage', { ...newMessage })

            if(newMessage.status === CONSTANS.STATUSES_MESSAGES.GOOD && newMessage.autor !== getUser) {
                let result = await markMessage(newMessage.id)
                if(result) {
                    commit('markMessage', newMessage.id)
                    localStorage.setItem(CONSTANS.STORAGE_MARK_MESSAGE, newMessage.id)
                }
            }

            resolve(true)
        })
    },

    saveMessage: function ({commit}, text) {
        (async () => {
            let autor = getUser()
            let message = {
                temp_id: Math.random(),
                status: 'send',
                text: text,
                date: new Date().getTime(),
                autor: autor
            }
            commit('setMessage', message)
            let result = await sendMessage(message)
            commit('updateMessage', {
                data: result,
                temp_id: message.temp_id
            })

            if(result && !result.error) {
                localStorage.setItem(CONSTANS.STORAGE_NEW_MESSAGE, result.id)
            }
        })();
    },

    reSendMessage: function ({commit}, message) {
        return new Promise(async (resolve, reject) => {
            let result = await sendMessage(message)
            commit('updateMessage', {
                data: result,
                temp_id: message.temp_id
            })

            if(result && !result.error) {
                localStorage.setItem(CONSTANS.STORAGE_NEW_MESSAGE, result.id)
                resolve(true)
            } else {
                reject(false)
            }
        });
    }
};

export default actions;
