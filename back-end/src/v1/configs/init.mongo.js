import {connect} from 'mongoose'
const t = () => {
    connect(process.env.MONGO_URI)
        .then(() => console.log('Connect mongo successfully'))
        .catch(err => console.log(err.message))
}

export default t