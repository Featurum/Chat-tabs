<template>
<div class="login">
	<form class="login-form" @submit.prevent="submitLogin">
		<div class="login-form__title">Вход в чат</div>
		<div class="login-form__field">
			<input
				:class="[
					'login-form__input',
					{ '_error': $v.name.$error }
				]"
				v-model.trim="$v.name.$model"
				placeholder="Введите ваше имя"
			/>

			<div class="login-form__error" v-if="$v.name.$error">
				<template v-if="!$v.name.required">Введите ваше имя</template>
				<template v-if="!$v.name.minLength">Имя должно быть хотя бы {{$v.name.$params.minLength.min}} символов</template>
			</div>
		</div>

		<div class="login-form__field _button">
			<button class="login-form__button" type="submit" :disabled="$v.$invalid">Войти</button>
		</div>
	</form>
</div>
</template>

<script src="./login.js"/>

<style scoped lang="scss" src="./login.scss"/>
