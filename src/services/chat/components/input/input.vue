<template>
	<form class="input-container" v-on:submit.prevent="sendMessage()">
	    <input
			class="input-container__input"
			v-model.trim="$v.text.$model"
			placeholder="Введите текст сообщения"
		/>
		<button class="input-container__button" :disabled="$v.$invalid" type="submit">Отправить</button>
	</form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    data: () => ({
    	text: ''
    }),

    validations: {
	    text: {
	     	required
	    }
  	},

    methods: {
    	sendMessage() {
    		if(!this.$v.$invalid) {
    			this.$emit('input', this.text)
    			this.$set(this, 'text', '')
    		}
    	}
    }
}
</script>

<style scoped lang="scss">
	.input-container {
		display: flex;

		&__input {
			width: 100%;
			height: 32px;
			padding: 0 16px;
			border: 1px solid #eee;
			border-radius: 3px;
		}

		&__button {
			padding: 8px 24px;
		    background-color: #2196f3;
		    border-radius: 3px;
		    color: #fff;
		    font-weight: 500;
		    opacity: .9;
		    margin-left: 25px;

		    &:disabled {
		    	opacity: .5;
		    	filter: grayscale(100%); 
		    }

		    &:not(:disabled):hover {
		    	opacity: 1;
		    }
		}
	}
</style>
