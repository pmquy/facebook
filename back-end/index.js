import './env.js'
import app from './src/app.js'
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running')
})
export default app