# 1\. Project Requirements Document

1.1. Project Title: Funeral Donation Tracker

1.2. Project Objective: To develop a client-side, single-page web application that allows users to easily and efficiently create, preview, and print/download donation receipts for funeral events. The application will be fast, responsive, and work offline by storing all data on the user's device.

1.3. Core Features: The application will replicate and enhance the functionality of the HTML prototype.

- Two-Part Layout: A user-friendly interface with an input form at the top and a live preview of the receipt directly below it.

- Live Data Binding: All information entered into the form (e.g., names, amount) will instantly update on the receipt preview.

- Photo Upload: Users can upload a photo of the deceased, which will be displayed on the receipt.

- Dynamic QR Code: A QR code will be generated in real-time on the receipt, containing key donation details for quick verification.

- Print Functionality: A "Print" button will format and send the receipt preview to the browser's print dialog.

- PDF Download: A "Download PDF" button will convert the receipt preview into a high-quality PDF file and save it to the user's device.

- Data Persistence: The application will use localForage to automatically save the entered data, so it isn't lost if the page is reloaded.

1.4. Technology Stack:

- Frontend Framework: Vue.js 3 (with Composition API)

- Language: TypeScript

- Styling: TailwindCSS

- State Management: Pinia (as the central "action hub")

- Local Storage:  localForage (for a user-friendly IndexedDB interface)

- QR Code Generation:  qrcode.js or a Vue-compatible wrapper.

- PDF Generation:  html2canvas and jspdf.

## 2\. Text-Based Wireframes (Top/Bottom Layout)

This layout is optimized for a natural, top-to-bottom workflow on both desktop and mobile.

2.1. Desktop Wireframe

+--------------------------------------------------------------------------+

|  Funeral Donation Tracker                                                |

|  Enter donation details below and see a live preview.                    |

+--------------------------------------------------------------------------+

|                                                                          |

|  [ SCROLLABLE PAGE CONTENT ]                                             |

|                                                                          |

|  +--------------------------------------------------------------------+  |

|  |  Donation Information                                              |  |

|  |  ----------------------------------------------------------------  |  |

|  |                                                                    |  |

|  |  Name of Deceased: [_____________________________________________] |  |

|  |  Name of Event:    [_____________________________________________] |  |

|  |  Photo of Deceased: [ Choose File ]                                |  |

|  |  ... (all other input fields here) ...                             |  |

|  |                                                                    |  |

|  +--------------------------------------------------------------------+  |

|                                                                          |

|  (User scrolls down)                                                     |

|                                                                          |

|  +--------------------------------------------------------------------+  |

|  |  Live Receipt Preview                                              |  |

|  |  ----------------------------------------------------------------  |  |

|  |                                                                    |  |

|  |  +--------------------------------------------------------------+  |  |

|  |  |                                                              |  |  |

|  |  |      [This area contains the full receipt preview,            ]  |  |

|  |  |      exactly as seen in the HTML prototype, with the          ]  |  |

|  |  |      photo, names, amount, and QR code.]                      ]  |  |

|  |  |                                                              |  |  |

|  |  +--------------------------------------------------------------+  |  |

|  |                                                                    |  |

|  +--------------------------------------------------------------------+  |

|                                                                          |

|  +--------------------------------------------------------------------+  |

|  |  [Download PDF Button]                              [Print Button] |  |

|  +--------------------------------------------------------------------+  |

|                                                                          |

+--------------------------------------------------------------------------+

2.2. Mobile Wireframe

+--------------------------------------+

|  Funeral Donation Tracker            |

|  ----------------------------------  |

|                                      |

|  [ SCROLLABLE PAGE CONTENT ]         |

|                                      |

|  +--------------------------------+  |

|  | Donation Information           |  |

|  | ------------------------------ |  |

|  |                                |  |

|  | Name of Deceased:              |  |

|  | [____________________________] |  |

|  |                                |  |

|  | Name of Event:                 |  |

|  | [____________________________] |  |

|  |                                |  |

|  | ... (all other inputs) ...     |  |

|  +--------------------------------+  |

|                                      |

|  (User scrolls down)                 |

|                                      |

|  +--------------------------------+  |

|  | Live Receipt Preview           |  |

|  | ------------------------------ |  |

|  |                                |  |

|  |  [ Full receipt preview ]      |  |

|  |  [ with photo, details, ]      |  |

|  |  [ QR code, etc.        ]      |  |

|  |                                |  |

|  +--------------------------------+  |

|                                      |

|  +--------------------------------+  |

|  | [ Download PDF Button ]        |  |

|  +--------------------------------+  |

|  | [ Print Receipt Button ]       |  |

|  +--------------------------------+  |

|                                      |

+--------------------------------------+

### 3\. File and Component Structure

This structure organizes the Vue.js project logically for scalability and maintainability.

/src

|

|-- /assets

|   |-- main.css             # Global styles

|

|-- /components

|   |-- /form

|   |   |-- FormInput.vue      # Reusable text input component

|   |   |-- FormSelect.vue     # Reusable select component

|   |   |-- FileUploader.vue   # Component for photo upload

|   |

|   |-- /receipt

|   |   |-- ReceiptPreview.vue # The main component for the receipt preview

|   |   |-- QRCode.vue         # Component to display the QR code

|   |

|   |-- /ui

|   |   |-- AppHeader.vue      # The main page header

|   |   |-- BaseButton.vue     # A general-purpose button

|

|-- /composables

|   |-- useReceiptPDF.ts     # Logic for generating PDF (html2canvas, jspdf)

|   |-- useReceiptPrint.ts   # Logic for printing

|   |-- useQRCodeGenerator.ts # Logic for updating the QR code

|

|-- /stores

|   |-- receipt.ts           # Pinia store for all receipt data

|

|-- /types

|   |-- index.ts             # TypeScript interfaces (e.g., Donation, Event)

|

|-- /views

|   |-- DonationTrackerView.vue # The main page view that assembles all components

|

|-- App.vue                  # Root Vue component, contains the router-view

|-- main.ts                  # App entry point (initializes Vue, Pinia)

|-- shims-vue.d.ts           # TypeScript shim for .vue files
