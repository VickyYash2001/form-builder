# Angular Form Builder

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.14.

A powerful drag-and-drop form builder application built with Angular 17, Angular Material, and Tailwind CSS.

## Featur0es

- **Intuitive Drag-and-Drop Interface**
- **Modular Component Architecture**
- **Customizable Form Elements**
  - Text fields, textareas, numbers, dates
  - Select dropdowns, radio buttons, checkboxes
  - File uploads
- **Live Preview** (with bottom sheet display)
- **Fully Responsive Design**
- **Field Property Customization**
- **Form Field Grouping**

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+ or yarn
- Angular CLI v17+

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VickyYash2001/form-builder.git
   cd form-builder

   ```

2. Install dependencies:
   npm install

3. Start the development server:
   ng serve

4. Open your browser to:
   http://localhost:4200/

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Project Structure

src/
├── app/
│ ├── components/
│ │ ├── field-groups-panel/ # Left panel - form groups
│ │ ├── form-elements-panel/ # Middle panel - form builder
│ │ ├── field-properties-drawer/ # Right panel - field properties
│ │ ├── elements-library-panel/ # Form elements library
│ │ └── live-preview/ # Preview component
│ ├── models/ # Data models
│ ├── services/ # Application services
│ ├── app.component.\* # Root component
│ └── app.module.ts # Root module
├── assets/
├── environments/
└── styles/ # Global styles

### Technologies Used

Frontend Framework: Angular 17

UI Components: Angular Material

Styling: Tailwind CSS

Drag-and-Drop: Angular CDK

State Management: RxJS

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Deployment

To build for production:
ng build --configuration production

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
