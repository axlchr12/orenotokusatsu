# My Tokusatsu (俺の特撮)
[![Author](https://img.shields.io/badge/author-axlchr12-blue.svg)](https://github.com/axlchr12)
[![Source code](https://img.shields.io/badge/source-orenotokusatsu-blue.svg)](https://github.com/axlchr12/orenotokusatsu)
[![Software license](https://img.shields.io/github/license/axlchr12/orenotokusatsu.svg)](https://opensource.org/licenses/MIT)
[![Deployment Status](https://github.com/axlchr12/orenotokusatsu/actions/workflows/deploy.yml/badge.svg)](https://github.com/axlchr12/orenotokusatsu/actions)

**My Tokusatsu (俺の特撮)** is a modern React-based web application that allows fans to pick their top 12 favorite Tokusatsu titles, organize them into a curated list, and share the results on social media.

The app is built with a global audience in mind, featuring full localization for **English**, **Indonesian**, and **Japanese**.

## Features

* **Top 12 Selection:** Curate a personalized grid of your favorite 12 Tokusatsu titles.
* **Dynamic Search:** Real-time search functionality powered by **TheMovieDatabase (TMDB) API**.
* **Multilingual Support (i18n):** Seamlessly switch between English, Indonesian, and Japanese.
* **Image Generation:** Convert your list into a high-quality image using `html-to-image`.
* **Responsive Design:** Built with Tailwind CSS 4.0 for a mobile-first experience.

## Tech Stack

* **Framework:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite 6](https://vitejs.dev/)
* **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
* **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest)
* **API:** [TMDB API](https://www.themoviedb.org/documentation/api)
* **Localization:** [i18next](https://www.i18next.com/)

## Current Problem
* **API Filtering Limitations:** Since this repo **uses** TMDB's API for multi search, TMDB lacks a specific "Tokusatsu" category or keyword filter in its search endpoint. Consequently, all filtering (Genre IDs, Original Language, and excluding Anime) must be handled **manually on the frontend**, which limits search precision.
* **Localization Mismatch:** The `/search/multi` endpoint does not support fetching dual-language metadata (EN/JP) simultaneously.
* **Double-Fetching Overhead:** The app currently performs an initial English search, then maps through the results to fetch specific Japanese details (`overviewJp`) via secondary API calls, impacting performance.
* **Naming Inconsistencies:** Manual mapping is required for certain localized titles (e.g., "Masked Rider DCD" instead of "Kamen Rider Decade").
* **Franchise Grouping Issues:** TMDB often groups distinct Tokusatsu titles into a single "Series" entry (e.g., the "Chouseishin Series" groups *Gransazer*, *Justirisers*, and *Sazer-X* into seasons). This prevents users from selecting individual shows as separate entries since the search endpoint only returns the parent series.

## TODO
- [ ] Implement a caching layer and debouncing to minimize redundant API calls during the "Double-Fetch" process.
- [ ] Add comprehensive comments to all components and implement unit tests to ensure stability.
- [ ] Explore a logic to detect "Series" entries and allow users to pick specific seasons as standalone items in their Top 12 list.

## Getting Started

### Prerequisites
* Node.js (Latest LTS)
* TMDB API Key

### Installation
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/orenotokusatsu.git](https://github.com/yourusername/orenotokusatsu.git)
    cd orenotokusatsu
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file and add your TMDB API Key:
    ```env
    VITE_TMDB_API_KEY=your_api_key_here
    ```

4.  **Run development server:**
    ```bash
    npm run dev
    ```

## License
This project is private. Data provided by TMDB API.
