# upload.ai

This project offers a user interface (UI) and server for seamless interaction with chat GPT.
It comes equipped with a range of features designed to enhance your experience:

- **Upload Video**:

  - Extract Audio from Video: Utilizes `FFmpeg` with `WebAssembly` to convert MP4 files to MP3.
  - Upload Audio to Backend: Leverages `Prisma` and `SQLite` to store MP3 files and create corresponding database representations.
  - Transcribe the MP3: Incorporates the `OpenAI Whisper` service with customizable prompts, storing transcriptions in the database.

- **Select Templates**: Choose from a selection of predefined prompt templates to streamline interactions with video transcriptions.

- **Configure Temperature**: Fine-tune the temperature settings to achieve the desired level of response creativity and randomness.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: [Next.js](https://nextjs.org/) app
- `backend`: [Fastify](https://fastify.dev/)
- `ts-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Develop

Install dependencies: (root directory)

```bash
npm install
```

To run all apps and packages, run the following command:

```bash
cd my-turborepo
npm run dev
```

#### Backend

To seed the database, run the following command: (/apps/backend directory)

```bash
npx prisma db seed
```
