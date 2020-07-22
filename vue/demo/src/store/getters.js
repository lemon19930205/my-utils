const getters = {
  loading: state => {
    if (state.sidebar.length > 0) {
      return false
    } else {
      return true
    }
  }
}

export default getters