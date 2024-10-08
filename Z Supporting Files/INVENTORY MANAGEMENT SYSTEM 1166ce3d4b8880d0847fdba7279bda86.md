# INVENTORY MANAGEMENT SYSTEM

## **MODULES**

1. **Dashboard:** The dashboard module provides an overview of key performance indicators (KPIs), such as inventory levels, sales, and revenue, in a visually informative way. It allows users to quickly assess the state of their inventory at a glance.
2. **Inventory Module:**
    - **Item Management:** This module helps in creating, editing, and managing individual items in the inventory. It includes item details like name, description, SKU, pricing, and categorization.
    - **Item Groups:** Organizing items into groups or categories, making it easier to manage and find specific items.
3. **Sales Module:**
    - **Customer Management:** Storing and managing customer information, including contact details, purchase history, and preferences.
    - **Sales Orders:** Creating, tracking, and managing customer orders and shipments.
    - **Packages and Shipments:** Handling the packaging and shipment of items to customers.
    - **Invoices and Receipts:** Generating and managing invoices for sales transactions, including tracking payments and receipts.
4. **Purchases Module:**
    - **Vendor and Supplier Management:** Maintaining information about suppliers, including contact details, terms, and history.
    - **Purchase Orders:** Creating, managing, and tracking orders to suppliers.
    - **Bills and Expenses:** Tracking expenses related to inventory purchases, such as shipping and handling costs.
    - **Payments Made:** Recording and tracking payments made to suppliers.
5. **Reports Module:**
    - **Sales Reports:** Generating reports on sales performance, including sales by item, customer, or period.
    - **Inventory Reports:** Providing insights into inventory levels, item movement, and stock status.
    - **Receivables Reports:** Managing and monitoring outstanding payments and receivables from customers.
6. **User Management:** Ensuring that only authorized users can access the system by managing user accounts, roles, and permissions.
7. **Settings and Configuration:** Allowing users to configure system settings, such as tax rates, 

## DASHBOAD

**Dashboard:** The dashboard module provides an overview of key performance indicators (KPIs), such as inventory levels, sales, and revenue, in a visually informative way. It allows users to quickly assess the state of their inventory at a glance.

Here are the key performance indicators (KPIs) for the Inventory Management System, along with additional information on how to present each KPI for effective visualization:

1. **Inventory Levels:**
    - **Explanation:** Provides an overview of the current quantity of items in the inventory.
    - **Use:** Helps assess stock levels and make informed decisions regarding replenishment or reduction.
    - **Presentation:** Typically presented as a bar chart or a line graph showing inventory quantities over time.
2. **Inventory Turnover:**
- **Explanation:** Measures how quickly items are sold and replaced within a specific time frame.
- **Use:** Indicates inventory management efficiency and helps optimize purchasing.
- **Presentation:** Often visualized as a line graph showing turnover rates over time.
1. **Inventory Turnover:**
- **Explanation:** Measures how quickly items are sold and replaced within a specific time frame.
- **Use:** Indicates inventory management efficiency and helps optimize purchasing.
- **Presentation:** Often visualized as a line graph showing turnover rates over time.
1. **Gross Profit Margin:**
- **Explanation:** Calculates the profitability of each sale by subtracting the cost of goods sold from the total revenue.
- **Use:** Ensures profitability and pricing adjustments if needed.
- **Presentation:** Typically displayed as a line graph showing gross profit margins over time.

## INVENTORY MODULE

**Items**

1. Item Name: The name or title of the item.
2. Description: A brief description or information about the item.
3. Category: The category or type to which the item belongs (e.g., electronics, clothing, groceries).
4. SKU (Stock Keeping Unit): A unique identifier for the item to help with tracking.
5. Barcode: The barcode associated with the item, if applicable.
6. Quantity: The initial quantity of the item in stock.
7. Unit to be Measured in
8. Item Brand
9. Unit Price: The price of a single unit of the item.
10. Cost Price: The cost of acquiring the item.
11. Supplier: The supplier or vendor from whom the item was purchased.
12. Reorder Point: The quantity at which you need to reorder the item.
13. Warehouse: The physical or storage location of the item in your inventory.
14. Images: Allow users to upload images of the item for visual identification.
15. Weight: The weight of the item, which can be important for shipping calculations.
16. Dimensions: The physical dimensions of the item, especially if it affects storage or shipping.
17. Tax Rate: The applicable tax rate for the item's sales.
18. Notes: Any additional notes or information related to the item.

**Units**

1. Unit Name: The name or label of the unit of measurement (e.g., kg, piece, liter).
2. Abbreviation**:** A short abbreviation or symbol for the unit (e.g., kg for kilograms, pc for pieces).
3. Default Unit**:** A field indicating whether this unit is the default unit of measurement for items.

**Brand**

1. Brand Name: The name or label of the brand.

**Managing Categories**

**Category:**

1. Category Name: The name or title of the category (e.g., Electronics, Clothing, Groceries).
2. Description: A brief description of the category.

**Warehouse:**

1. Warehouse Name: The name or label of the warehouse.
2. Location: The physical address or location of the warehouse.
3. Description: Additional details or a description of the warehouse.
4. Warehouse Type: Indicate whether it's the main warehouse or a branch warehouse.

## SALES MODULE

**Sales Order:**

1. Order Number: A unique identifier for each sales order.
2. Customer: The customer associated with the order.
3. Order Date: The date when the order was placed.
4. Order Status: The current status of the order (e.g., pending, shipped, delivered).
5. Items Ordered: A list of items included in the order, including item name, quantity, and price.
6. Shipping Address: The address to which the order should be shipped.
7. Billing Address: The address for invoicing.
8. Order Total: The total value of the order.
9. Payment Method: The method used for payment (e.g., credit card, cash on delivery).
10. Sales Representative: The staff member responsible for managing the order.

**Packages:**

1. Package Number: A unique identifier for each package.
2. Sales Order: The associated sales order for the package.
3. Package Status: The status of the package (e.g., packed, in transit, delivered).
4. Contents: A list of items included in the package.
5. Weight: The weight of the package.
6. Shipping Carrier: The carrier or shipping service used.
7. Tracking Number: The tracking number for package tracking.
8. Estimated Delivery Date: The expected delivery date.

**Invoices:**

1. Invoice Number: A unique identifier for each invoice.
2. Customer: The customer associated with the invoice.
3. Invoice Date: The date when the invoice was generated.
4. Due Date: The date by which payment is expected.
5. Items Invoiced: A list of items included in the invoice, including item name, quantity, and price.
6. Invoice Total: The total amount due on the invoice.
7. Payment Status: The status of the payment (e.g., paid, outstanding).
8. Payment Method: The method used for payment (e.g., credit card, bank transfer).

**Receipts:**

1. Receipt Number: A unique identifier for each receipt.
2. Invoice: The associated invoice for the receipt.
3. Receipt Date: The date when the payment was received.
4. Payment Method: The method used for payment (e.g., cash, check, credit card).
5. Amount Received: The amount received in the payment.
6. Payment Status: The status of the payment (e.g., cleared, pending).
7. Payment Reference: Any reference number or notes related to the payment.

## PURCHASE MODULE

**Supplier:**

1. Supplier Name: The name of the supplier or vendor.
2. Contact Information: Fields for contact information, including phone number, email, and address.
3. Contact Person: The name of the main contact person at the supplier.
4. Supplier Code: A unique identifier or code for the supplier.
5. Payment Terms: Terms of payment agreed upon with the supplier.
6. Tax ID: The supplier's tax identification number.
7. Notes: Any additional notes or information about the supplier

**Purchase Order:**

1. Order Number: A unique identifier for each purchase order.
2. Supplier: The supplier from whom the items are being ordered.
3. Order Date: The date when the purchase order was placed.
4. Expected Delivery Date: The expected delivery date of the items.
5. Items Ordered: A list of items included in the purchase order, including item name, quantity, and price.
6. Total Cost: The total cost of the purchase order.
7. Order Status: The current status of the purchase order (e.g., pending, shipped, received).
8. Receiving Location: The location where the items will be received.

**Expenses:**

1. Expense Type: The type or category of the expense (e.g., shipping, handling, import taxes).
2. Expense Date: The date when the expense was incurred.
3. Amount: The cost of the expense.
4. Receipt or Reference Number: Any reference number or receipt associated with the expense.
5. Description: A brief description or notes related to the expense.

**Payments Made:**

1. Payment Number: A unique identifier for each payment made to suppliers.
2. Supplier: The supplier to whom the payment is made.
3. Payment Date: The date when the payment was made.
4. Payment Method: The method used for payment (e.g., check, bank transfer).
5. Amount Paid: The amount paid to the supplier.
6. Invoice Reference: Reference to the invoice or purchase order for which the payment is made.
7. Notes: Any additional notes or information related to the payment.

## USER MANAGEMENT MODULE

**User Account:**

1. User ID: A unique identifier for each user.
2. Username: The user's login name or handle.
3. Full Name: The user's full name.
4. Email: The user's email address for communication and notifications.
5. Password: Secure storage of user passwords (hashed and salted).
6. Profile Picture: An optional profile picture or avatar.
7. Contact Information: Additional contact details such as phone number and address.
8. Account Status: User account status (e.g., active, disabled, locked).
9. Last Login: The date and time of the user's last login.
10. Account Creation Date: The date when the user account was created.

**Roles and Permissions:**
11. Role: The user's role or group (e.g., administrator, manager, staff).

1. Permissions: A list of permissions associated with each role, specifying what actions or areas of the system the user can access or modify.
2. Role-Based Access Control (RBAC): Assigning roles to users to manage their access and actions based on their responsibilities.

**Security and Authentication:**
14. Two-Factor Authentication (2FA): A field indicating whether 2FA is enabled for the user's account.

1. Password Expiry: The duration after which the user must change their password.
2. Password Complexity Rules: Requirements for strong passwords (e.g., length, special characters).
3. Account Lockout Policies: Rules for locking out accounts after repeated failed login attempts.

**User Activity and Audit Trail:**
18. User Activity Logs: A record of user actions and activities in the system.

1. Audit Trail: A history of significant changes or actions taken by users, including date, time, and the user responsible.

**Profile Settings:**
20. Language Preferences: User's language preferences for system interface.

1. Theme Preferences: User's choice of system theme (e.g., light or dark).
2. Email Notifications: User's preferences for email notifications (e.g., order updates, system alerts).
3. Timezone Settings: User's preferred timezone for date and time display.

## Normal Form

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* Title */}
        <div className="sm:col-span-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
          >
            Course Title
          </label>
          <div className="mt-2">
            <input
              {...register("title", { required: true })}
              type="text"
              name="title"
              id="title"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
              placeholder="Type the Course title"
            />
            {errors.title && (
              <span className="text-sm text-red-600 ">
                Course title is required
              </span>
            )}
          </div>
        </div>
        {/* Price */}
        <div className="sm:col-span-2">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Course Price
          </label>
          <input
            {...register("price", { required: true })}
            type="number"
            name="price"
            id="price"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5  "
            placeholder="$2999"
            required=""
          />
          {errors.price && (
            <span className="text-sm text-red-600 ">
              Course price is required
            </span>
          )}
        </div>
        {/* Description */}
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Course Description
          </label>
          <div className="mt-2">
            <textarea
              {...register("description", { required: true })}
              id="description"
              name="description"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
            {errors.title && (
              <span className="text-sm text-red-600 ">
                Course description is required
              </span>
            )}
          </div>
        </div>

{/* Select Course */}
        <div className="w-full">
          <label
            htmlFor="course"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Select Course
          </label>
          <div className="mt-2">
            <select
              {...register("courseId")}
              id="course"
              name="course"
              autoComplete="course-name"
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value={currentCourse.id}>{currentCourse.title}</option>
              {/* <option>Canada</option>
              <option>Mexico</option> */}
            </select>
          </div>
        </div>
        {/* Course Image */}

        {/* Upload thing */}
        <div className="col-span-full">
          <div className="flex justify-between items-center mb-4">
            <label
              htmlFor="course-image"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Course Image
            </label>
            {imageUrl && (
              <button
                onClick={() => setImageUrl("")}
                type="button"
                className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
              >
                <Pencil className="w-5 h-5" />
                <span>Change Image</span>
              </button>
            )}
          </div>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="course image"
              width={1000}
              height={667}
              className="w-full h-64 object-cover"
            />
          ) : (
            <UploadDropzone
              endpoint="courseImageUploader"
              onClientUploadComplete={(res) => {
                setImageUrl(res[0].fileUrl);
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}
        </div>
        {/* IsPublished */}
        <div className="w-full">
          <h2 className="text-slate-900">Publish the Course</h2>
        </div>
        <div className="w-full">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              {...register("isPublished")}
              type="checkbox"
              defaultValue={true}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {isPublished ? "Published" : "Draft"}
            </span>
          </label>
        </div>
      </div>
      {loading ? (
        <button
          disabled
          type="button"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 mr-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Saving Course Please wait...
        </button>
      ) : (
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 hover:bg-purple-800"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span>Save Course</span>
        </button>
      )}
    </form>
```

## Creating FormInput Elements

### TextInput Component

```jsx
export default function TextInput({
  label,
  name,
  register,
  errors,
  isRequired = true,
  type = "text",
  className = "sm:col-span-2",
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...register(`${name}`, { required: isRequired })}
          type={type}
          name={name}
          id={name}
          autoComplete={name}
          className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          placeholder={`Type the ${label.toLowerCase()}`}
        />
        {errors[`${name}`] && (
          <span className="text-sm text-red-600 ">{label} is required</span>
        )}
      </div>
    </div>
  );
}
```

### Usage

```jsx
// YourForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from './TextInput';

const YourForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="firstName"
        label="First Name"
        type="text"
        register={register}
        required
      />

      <TextInput
        name="lastName"
        label="Last Name"
        type="text"
        register={register}
        required
      />

      {/* Add more input fields as needed */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default YourForm;
```

## Other Components

### SelectInput Component

```jsx
import React from "react";

export default function SelectInput({
  label,
  name,
  register,
  className = "sm:col-span-2",
  options = [],
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          {...register(`${name}`)}
          id={name}
          name={name}
          className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          {options.map((option, i) => {
            return (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
```

### Image Component

```jsx
import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "col-span-full",
  endpoint = "imageUploader",
}) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrl("")}
            type="button"
            className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Item image"
          width={1000}
          height={667}
          className="w-full h-64 object-cover"
        />
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            setImageUrl(res[0].fileUrl);
            // Do something with the response
            console.log("Files: ", res);
            console.log("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            console.log(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
}
```

### Textarea Component

```jsx
"use client";

import { useForm } from "react-hook-form";

export default function TextareaInput({
  label,
  name,
  register,
  errors,
  isRequired = true,
  type = "text",
  className = "sm:col-span-2",
}) {
  // const {
  //   register,
  //   formState: { errors },
  // } = useForm();
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          {...register(`${name}`, { required: isRequired })}
          name={name}
          id={name}
          rows={3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={""}
        />
        {errors[`${name}`] && (
          <span className="text-sm text-red-600 ">{label} is required</span>
        )}
      </div>
    </div>
  );
}
```

## Submit Button

```jsx
import { Plus } from "lucide-react";
import React from "react";

export default function SubmitButton({ isLoading, title }) {
  return (
    <div className="sm:col-span-1">
      {isLoading ? (
        <button
          disabled
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 mr-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Saving {title} Please wait...
        </button>
      ) : (
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span>Save {title}</span>
        </button>
      )}
    </div>
  );
}
```

## Usage

```jsx
// YourForm.js
// ...
import SelectInput from './SelectInput';
import ImageInput from './ImageInput';
import TextareaInput from './TextareaInput';

const YourForm = () => {
  // ...
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput name="firstName" label="First Name" type="text" register={register} required />
      <TextInput name="lastName" label="Last Name" type="text" register={register} required />
      <SelectInput
        name="gender"
        label="Gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
        register={register}
        required
      />
      <ImageInput name="profileImage" label="Profile Image" register={register} required />
      <TextareaInput name="bio" label="Bio" register={register} required />
      {/* Add more input fields as needed */}
      <button type="submit">Submit</button>
    </form>
  );
};
// ...
```

## Uploadthing

```jsx
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  courseImageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete", metadata);
      console.log("file url", file.url);
    }
  ),
  courseAttachmentUploader: f(["pdf"]).onUploadComplete(
    async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete", metadata);
      console.log("file url", file.url);
    }
  ),
};
```

## PRISMA SET UP

install the Prisma CLI as a development dependency in the project:

```bash
npm install prisma --save-dev
```

install prisma client

```bash
npm install @prisma/client
```

Initiate Prisma and Mongo db

```bash
npx prisma init --datasource-provider mongodb
```

# **Model your data in the Prisma schema**

```jsx
// schema.prisma
model Category {
  id  String  @id @default(auto()) @map("_id") @db.ObjectId
  title String
  description String?
}
```

## Get the DATABASE CONNECTION STRING

Update the .env file with your db url

## Generate the prisma client instance

```bash
npx prisma generate
```

## Push the Models to the Datasea

```bash
npx prisma db push
```

## run the studio

```bash
npx prisma studio
```

Create the global prisma instance :  create a file in libs called db.js

```jsx
import { PrismaClient } from "@prisma/client";

const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db;
```

# **Model your data in the Prisma schema**

## PRISMA SCHEMAS

```scheme
model Item {
  id            Int       @id @default(autoincrement())
  name          String
  description   String?
  category      Category  @relation(fields: [categoryId], references: [id])
  categoryId    Int
  sku           String    @unique
  barcode       String?
  quantity      Int
  unit          Unit      @relation(fields: [unitId], references: [id])
  unitId        Int
  brand         Brand     @relation(fields: [brandId], references: [id])
  brandId       Int
  unitPrice     Float
  costPrice     Float
  supplier      String
  reorderPoint  Int
  location      String?
  images        String[]  @db.StringArray
  weight        Float?
  dimensions    String?
  taxRate       Float
  notes         String?
}

model Unit {
  id            Int     @id @default(autoincrement())
  name          String
  abbreviation  String
  defaultUnit   Boolean
}

model Brand {
  id       Int     @id @default(autoincrement())
  name     String
}

model Category {
  id          Int     @id @default(autoincrement())
  name        String
  description String?
}

model Warehouse {
  id            Int       @id @default(autoincrement())
  name          String
  location      String?
  description   String?
  warehouseType String
}

model Supplier {
  id              Int       @id @default(autoincrement())
  name            String
  phone           String?
  email           String?
  address         String?
  contactPerson   String?
  supplierCode    String    @unique
  paymentTerms    String?
  taxID           String?
  notes           String?
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId Int
}

model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}
model YourModel {
  id       Int      @id @default(autoincrement())
  name     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
const items = await prisma.item.findMany({
  orderBy: {
    createdAt: 'desc', // 'asc' for ascending, 'desc' for descending
  },
});
```

## HELPER FUNCTIONS

```jsx
// Function to generate a random barcode with a timestamp component
function generateBarcodeWithTimestamp() {
  const characters = '0123456789';
  const barcodeLength = 10; // You can adjust the length as needed
  const timestampComponent = Date.now().toString();
  let barcode = timestampComponent;

  while (barcode.length < barcodeLength) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    barcode += characters.charAt(randomIndex);
  }

  return barcode;
}

// Function to generate a SKU (Stock Keeping Unit) with a timestamp component
function generateSKUWithTimestamp() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const skuLength = 12; // You can adjust the length as needed
  const timestampComponent = Date.now().toString();
  let sku = timestampComponent;

  while (sku.length < skuLength) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sku += characters.charAt(randomIndex);
  }

  return sku;
}

// Example usage:
const generatedBarcode = generateBarcodeWithTimestamp();
const generatedSKU = generateSKUWithTimestamp();

console.log('Generated Barcode:', generatedBarcode);
console.log('Generated SKU:', generatedSKU);
```

## Refactoring OnSubmit Function

```jsx
import toast from "react-hot-toast";

export async function makePostRequest(
  setLoading,
  endpoint,
  data,
  resourceName,
  reset
) {
  try {
    setLoading(true);
    const baseUrl = "http://localhost:3000";
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log(response);
      setLoading(false);
      toast.success(`New ${resourceName} Created Successfully`);
      reset();
    } else {
      setLoading(false);
      toast.error("Something Went wrong");
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}
```

## Usage

```jsx
async function onSubmit(data) {
    const baseUrl = 'http://localhost:3000';
    makeApiRequest(baseUrl, 'POST', data, setLoading, toast.success, reset);
  }
```

## Parallel Data Fetching in Next js 13

```jsx
export default async function Page({ params: { username } }) {
  // Initiate both requests in parallel
  const artistData = getArtist(username)
  const albumsData = getArtistAlbums(username)
 
  // Wait for the promises to resolve
  const [artist, albums] = await Promise.all([artistData, albumsData])
 
  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums}></Albums>
    </>
  )
}
```

## Using the same form Updating Data

```jsx
// NewBrand.js

export default function NewBrand({ isUpdate, initialValues }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues }); // Pass initial values when in update mode

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    console.log(data);
    // Use different API endpoints and methods for create and update
    if (isUpdate) {
      // Handle update logic
      // makePutRequest(setLoading, `api/brands/${initialValues.id}`, data, "Brand", reset);
    } else {
      // Handle create logic
      // makePostRequest(setLoading, "api/brands", data, "Brand", reset);
    }
  }

  return (
    <div>
      {/* Header */}
      <FormHeader title={isUpdate ? "Update Brand" : "New Brand"} href="/dashboard/inventory/brands" />
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Brand Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>
        <SubmitButton isLoading={loading} title={isUpdate ? "Update Brand" : "Create Brand"} />
      </form>
    </div>
  );
}
```

## Advanced Data Table Logic to cater for Dates and Image

```jsx
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DataTable({ data = [], columns = [], resourceTitle }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((columnName, i) => {
              return (
                <th key={i} scope="col" className="px-6 py-3">
                  {columnName}
                </th>
              );
            })}
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {/* {columns.map((columnName, i) => {
                  return (
                    <td key={i} className="px-6 py-4">
                      {item[columnName]}
                    </td>
                  );
                })} */}
                {columns.map((columnName, i) => (
                  <td key={i} className="px-6 py-4">
                    {columnName === "imageUrl" ? (
                      <img
                        src={item[columnName]}
                        alt={`Image for ${resourceTitle}`}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    ) : columnName === "createdAt" ||
                      columnName === "updatedAt" ? (
                      new Date(item[columnName]).toLocaleDateString()
                    ) : (
                      item[columnName]
                    )}
                  </td>
                ))}

                <td className="px-6 py-4 text-right flex items-center space-x-4">
                  <Link
                    href={`/dashboard/inventory/${resourceTitle}/update/${item.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 flex items-center space-x-1"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <button className="font-medium text-red-600 dark:text-blue-500 flex items-center space-x-1">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

## Data table Logic to handle ImageUrl, Dates ,and Nested columns

```jsx
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DataTable({ data = [], columns = [], resourceTitle }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((columnName, i) => {
              return (
                <th key={i} scope="col" className="px-6 py-3">
                  {columnName}
                </th>
              );
            })}
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {/* {columns.map((columnName, i) => {
                  return (
                    <td key={i} className="px-6 py-4">
                      {item[columnName]}
                    </td>
                  );
                })} */}
                {columns.map((columnName, i) => (
                  <td key={i} className="px-6 py-4">
                    {columnName.includes(".") ? (
                      // If the column name contains a dot, it's a nested object
                      // Access the nested key using reduce
                      columnName.split(".").reduce((obj, key) => obj[key], item)
                    ) : columnName === "createdAt" ||
                      columnName === "updatedAt" ? (
                      // Convert date columns to a more readable format
                      new Date(item[columnName]).toLocaleDateString()
                    ) : columnName === "imageUrl" ? (
                      // Special handling for imageUrl to render an image
                      <img
                        src={item[columnName]}
                        alt={`Image for ${resourceTitle}`}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    ) : (
                      // Otherwise, display the value as is
                      item[columnName]
                    )}
                  </td>
                ))}

                <td className="px-6 py-4 text-right flex items-center space-x-4">
                  <Link
                    href={`/dashboard/inventory/${resourceTitle}/update/${item.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 flex items-center space-x-1"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <button className="font-medium text-red-600 dark:text-blue-500 flex items-center space-x-1">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

## Breaking Down the Nested Column Logic

```jsx
//Suppose you have item object lik this
const item = {
  id: "6549b31fe20214b08867c1cd",
  title: "Techno Phone",
  description: "Non est in dolorem v",
  category: {
    id: "6549a04868467a6d0005675c",
    title: "Phones",
    description: "This will Contain Phones",
    createdAt: "2023-11-07T02:26:16.300Z",
    updatedAt: "2023-11-07T02:26:16.300Z"
  }
};
//And suppose you're rendering a column with columnName set to "category.title." 
//The logic would work as follows:
// Assume columnName is "category.title"
columnName = "category.title"
columnName.includes('.') // true (it contains a dot) this means that its Object
columnName.split('.') // ["category", "title"]
reduce((obj, key) => obj[key], item) // Accesses item["category"]["title"]

//In this example, the final result would be the value of 
item["category"]["title"], //which is "Phones."
```

## How to get the ID from search Params

```jsx
export async function DELETE(request, { searchParams}) {
  const id = request.nextUrl.searchParams.get ("id"); // id will be "5"
  return NextResponse.json ({ id }, { status: 200 });
}
```

## DELETE BTN

```jsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineDelete } from "react-icons/md";
export default function DeleteBtn({ id }) {
  const router = useRouter();

  async function handleDeleteCourse() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await fetch(`http://localhost:3000/api/courses?id=${id}`, {
        method: "DELETE",
      });
      router.refresh();
    }
  }
  return (
    <button onClick={handleDeleteCourse}>
      <MdOutlineDelete size={32} />
    </button>
  );
}
```