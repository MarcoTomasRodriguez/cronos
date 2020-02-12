import Head from "next/head"
import Link from "next/link"

class Layout extends React.Component {
    render() {
        const { children, title } = this.props

        return (
            <div>
                <Head>
                    <title>{ title }</title>
                    <meta name="viewport" content="width=device-width" />
                    <meta name="description" content="You can't work with multiple timers in mind? Try Cronos and forget about them." />
                </Head>
                <header className="text-white bg-indigo-600 p-4 text-center">
                    <Link href="/">
                        <h1 className="text-white font-bold">
                            Cronos
                        </h1>
                    </Link>
                </header>
                { children }
            </div>
        )
    }
}

export default Layout