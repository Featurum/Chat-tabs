const getters = {
	listMessages: state => {
	    return state.listMessages.sort((a, b) => a.date - b.date)
	}
};

export default getters;