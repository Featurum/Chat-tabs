import { required, minLength } from 'vuelidate/lib/validators'
import { login } from '@/functions/auth.js'

export default {
    data: () => ({
    	name: ''
    }),

    validations: {
	   name: {
	     	required,
	     	minLength: minLength(6)
	   }
  	},

    methods: {
    	submitLogin() {
    		if(!this.$v.$invalid) {
    			let result = login(this.name)
    			if(result) {
    				this.$router.push({ name: 'mainChat' })
    			} else {
    				this.$notify({
					  	type: 'error',
					  	text: 'Произошла ошибка при авторизации'
					});
    			}
    		}
    	}
    }
}