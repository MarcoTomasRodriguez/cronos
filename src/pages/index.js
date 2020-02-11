import "../assets/styles/main.css"
import Layout from "../components/Layout"
import Timers from "../components/Timers"

class Index extends React.Component {
    render() {
        return (
            <Layout title="Timers">
                <Timers />
            </Layout>
        )
    }
}

export default Index