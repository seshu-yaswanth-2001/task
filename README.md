# Segment Creator App

A React app for building audience segments by choosing and customizing schema fields for users and groups. Features an interactive modal, user-friendly UI (Tailwind CSS), and modern React hooks.

## Features

- Dynamic trait selection with colored user/group indicators
- Add, change, and remove fields in a segment
- Responsive modal powered by React
- Save segments via POST to `/api/webhook` (mock endpoint)

## Installation

git clone <your-repo-url>
cd <your-folder>
npm install
npm run dev

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Click "Save Segment" to open the modal.
- Enter a segment name and choose traits to add from the dropdown.
  - Green dot: user trait
  - Red dot: group trait
- Remove or change trait rows as needed.
- Click "Save the Segment" to send payload.

## Project Structure

src/
├── components/
│ ├── SchemaRow.jsx # Trait row UI and logic
│ └── SegmentModal.jsx # Modal, form, segment logic
├── App.jsx # Main layout, modal trigger
├── index.jsx # Entry point
├── index.css # Tailwind CSS styles

## Customization

- Add or edit traits by modifying `ALL_OPTIONS` in `SegmentModal.jsx`.
- Replace the webhook path to use your own endpoint.

## Notes

- Built with React (hooks), Vite, and Tailwind CSS.
- Pure frontend demo; backend integration is extendable.
