import CONSTANS from '@/constans/'
import Vue from 'vue'
import {findKey} from '@/functions/findOptions.js'

const mutations = {
    setListMessages (state, payload) {
        Vue.set(state, 'listMessages', payload)
    },

    setMessage (state, payload) {
        state.listMessages.push(payload)
    },

    updateMessage (state, payload) {
    	let messageId = findKey(payload.temp_id, state.listMessages, 'temp_id')
        if(messageId) {
        	if(payload.data && !payload.data.error) {
    			Vue.set(state.listMessages[messageId], 'temp_id', undefined)
    			Vue.set(state.listMessages[messageId], 'id', payload.data.id)
    			Vue.set(state.listMessages[messageId], 'status', payload.data.status)
    		} else {
    			Vue.set(state.listMessages[messageId], 'status', CONSTANS.STATUSES_MESSAGES.ERROR)
    		}
        }
    },

    markMessage (state, id) {
        let messageId = findKey(id, state.listMessages, 'id')
        if(messageId) {
            Vue.set(state.listMessages[messageId], 'status', CONSTANS.STATUSES_MESSAGES.MARK)
        }
    }
}

export default mutations
