## Getting Started

First, run the development server: npm run auth

secondly, run the app: npm run dev

There is server folder in folder hierarchy which have backend server.js file and db.json file in database folder.
All user recoder saved init.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Folder structure and purpose
-- assets - containing assets (images) of porjects
-- components - containing re-use component which use from whole project.
-- interface - containing interface which is use for type checking
-- pages - it contain next pages
-- shared - it contain share javascript functions.
    --apiService - This file is used for handle the HTTP's calls, which received url, http method , data etc in paremeters.
-- styles - contain style files.
