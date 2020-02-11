import Head from 'next/head'
import Link from "next/link"

class Layout extends React.Component {
    render() {
        const { children, title } = this.props

        return (
            <div>
                <Head>
                    <title>{ title }</title>
                    <meta name="viewport" content="width=device-width"/>
                </Head>
                <header className="text-white bg-indigo-600 p-4 text-center">
                    <Link href="/">
                        <a className="text-white font-bold">
                            Timers
                        </a>
                    </Link>
                </header>
                { children }
            </div>
        )
    }
}

export default Layout