<template>
	<div
		v-if="data"
		:class="[
			'message',
			data.status,
			{
				'_my': isAutor,
				'_error': isError
			}
		]"
	>
		<div class="message__autor">{{ data.autor }}</div>
	    <div class="message__text">{{ data.text }}</div>
	    <ul class="message__about">
	    	<li><span>Дата;</span> {{ date }}</li>
	    	<li v-if="status"><span>Статус;</span> {{ status }}</li>

	    	<button v-if="isError" class="message__resend" @click="reSend" :disabled="preloader">
	    		{{ preloader ? '...' : 'Отправить повторно' }}
	    	</button>
	    </ul>
	</div>
</template>

<script>
import CONSTANS from '@/constans/'
import { getUser } from '@/functions/auth.js'
import { mapActions } from 'vuex'
export default {
    props: {
    	data: {
    		type: Object
    	}
    },

    data: () => ({
    	preloader: false
    }),

    computed: {
    	status() {
    		switch(this.data.status) {
    			case CONSTANS.STATUSES_MESSAGES.SEND:
    				return 'Отправка'
    				break;

    			case CONSTANS.STATUSES_MESSAGES.ERROR:
    				return 'Ошибка'
    				break;

    			case CONSTANS.STATUSES_MESSAGES.GOOD:
    				return 'Отправлено'
    				break;

    			case CONSTANS.STATUSES_MESSAGES.MARK:
    				return 'Прочитано'
    				break;
    		}
    	},

    	isError() {
    		return this.data.status === 'error'
    	},

    	isAutor() {
    		return this.data.autor === getUser()
    	},

    	date() {
    		return new Date(this.data.date)
    	}
    },

    methods: {
    	...mapActions({
            reSendMessage: 'chat/reSendMessage'
	    }),

	    async reSend() {
	    	this.preloader = true
    		await this.reSendMessage(this.data)
    		this.preloader = false
    	}
    }
}

</script>

<style scoped lang="scss">
	.message {
		max-width: 80%;
		background-color: #f5f5f5;
		padding: 10px;
		margin: 10px 0;
		line-height: 1.4;

		&._my {
			margin-left: auto;
		    background: #f4edff;
		}

		&._error {
		    background: #ffe5dd !important;
		}

		&__autor {
			font-size: 12px;
			font-weight: 700;
			margin-bottom: 10px;
		}

		&__text {
			font-size: 14px;
			margin-bottom: 10px;
		}

		&__about {
			list-style: none;
			font-size: 10px;
			display: flex;
			flex-wrap: wrap;
			margin: -5px;

			li {
				padding: 5px;
			}
		}

		&__resend {
			padding: 5px;
			margin-left: auto;
		}
	}
</style>
