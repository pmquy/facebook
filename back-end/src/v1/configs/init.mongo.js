import {connect} from 'mongoose'


export default async function () {
    return connect(process.env.MONGO_URI, {
        dbName: 'facebook'
    })
        .then(() => console.log('Connect mongo successfully'))
        .catch(err => console.log(err.message))
}