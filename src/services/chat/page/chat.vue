<template>
	<div class="chat">
	    <div class="chat-panel">
	    	<div class="chat-panel__list" ref="list">
	    		<v-chat-message
	    			v-for="(item, i) in listMessages"
	    			:data="item"
	    			:key="i"
	    		/>
	    	</div>

	    	<div class="chat-panel__newmessage">
	    		<v-chat-input v-on:input="newMessage($event)" />
	    	</div>
	    </div>
	</div>
</template>

<script src="./chat.js"/>

<style scoped lang="scss" src="./chat.scss"/>
