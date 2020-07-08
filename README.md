# Cronos

You can't work with multiple timers in mind? Cronos helps you to create and manage multiple short timers.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install the following programs:

-   Node.js
-   npm
-   Git

### Installing

Clone this git repository

```bash
git clone https://github.com/MarcoTomasRodriguez/cronos.git
```

Go to the cloned repository

```bash
cd cronos/
```

Install dependencies

```bash
npm i
```

## Running

### Development

In order to run the app in the development mode, run the following command.

Note: If you want to change the port, simply replace 3000 with another port.

```bash
PORT=3000 npm run dev
```

### Production

In order to run the app in the development mode, build the app with:

```bash
npm run build
```

Then execute the application with:

Note: If you want to change the port, replace 80 with the new port.

```bash
PORT=80 npm start
```

## Deployment

To deploy this project, [ZEIT Now](https://zeit.co/home) was used, due to the free and powerful service to deploy static web apps.

Install Now:

```bash
npm install now -g
```

Setup and deploy with:

```bash
now
```

## Built With

-   [Next.js](https://nextjs.org/) - Web framework
-   [React.js](https://reactjs.org/) - Used alongside with Next.js
-   [Redux](https://redux.js.org/) - State management system
-   [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
-   [npm](https://www.npmjs.com/) - Dependency Management

## License

This project is licensed under the GNU GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details
