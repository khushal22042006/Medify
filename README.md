# 🏥 Medify — Digital Prescription Platform

A full-stack web application for managing digital prescriptions between doctors, patients, and pharmacists. Built with **Node.js**, **Express**, **MongoDB**, and **Vanilla HTML/CSS/JS** using an MVC architecture.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Frontend | Vanilla HTML / CSS / JS |
| Auth | express-session + bcryptjs |
| Architecture | MVC (Model-View-Controller) |

---

## 📁 Project Structure

```
medify/
├── controllers/
│   ├── authController.js
│   ├── doctorController.js
│   ├── patientController.js
│   └── pharmacistController.js
├── models/
│   ├── User.js
│   └── Prescription.js
├── routes/
│   ├── authRoutes.js
│   ├── doctorRoutes.js
│   ├── patientRoutes.js
│   └── pharmacistRoutes.js
├── views/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── doctor/dashboard.html
│   ├── patient/dashboard.html
│   └── pharmacist/dashboard.html
├── public/
│   ├── css/
│   └── js/
├── .env
└── app.js
```

---

## ⚙️ Setup & Installation

### 1. Clone & Install
```bash
npm install
```

### 2. Configure `.env`
```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/medify
SESSION_SECRET=supersecretkey123
```

### 3. Start MongoDB
Open **MongoDB Compass** and connect to `mongodb://localhost:27017`

### 4. Run the Server
```bash
node app.js
# or with auto-restart:
nodemon app.js
```

---

## 🌐 Routes

| URL | Description |
|---|---|
| `http://localhost:8080/` | Home page |
| `http://localhost:8080/login` | Login |
| `http://localhost:8080/register` | Register |
| `http://localhost:8080/doctor/dashboard` | Doctor dashboard |
| `http://localhost:8080/patient/dashboard` | Patient dashboard |
| `http://localhost:8080/pharmacist/dashboard` | Pharmacist dashboard |

---

## ✅ Core Flow (Currently Working)

```
1. Doctor logs in
         ↓
2. Doctor creates prescription (enters patient's registered email)
         ↓
3. OTP is auto-generated and saved in MongoDB
         ↓
4. Patient logs in → sees OTP on their dashboard
         ↓
5. Patient shares OTP with Pharmacist
         ↓
6. Pharmacist enters OTP → verifies prescription
         ↓
7. Pharmacist clicks Dispense → status updated in MongoDB
         ↓
8. Patient dashboard shows prescription as "dispensed" in history
```

---

## 👥 User Roles

### 🩺 Doctor
- Create digital prescriptions
- View all prescriptions they've created
- See stats: Total prescriptions, Active patients, Today's prescriptions
- Each prescription generates a unique OTP for verification

### 🧑‍⚕️ Patient
- View all active prescriptions
- See OTP to share with pharmacist
- View full prescription history (active + dispensed)
- See medication details, dosage, instructions

### 💊 Pharmacist
- Verify prescriptions via OTP entry
- Scan QR codes (UI ready — camera integration coming)
- Dispense verified prescriptions
- View daily stats: Verified, Dispensed, Unique Patients

---

## 🗺️ Future Roadmap

### Phase 1 — Core Connections *(next priority)*
- [ ] Link prescription directly to patient account by email
- [ ] OTP expires after 24 hours (security)
- [ ] One-time use OTP — mark as used after verification
- [ ] Prescription cannot be dispensed twice

### Phase 2 — Patient Medical History
- [ ] Full history page with all past prescriptions
- [ ] Filter by date, doctor, medication
- [ ] Download prescription history as PDF

### Phase 3 — Connecting the 3 Roles
- [ ] Doctor searches patient by email before prescribing
- [ ] Doctor can choose a specific pharmacist from a list
- [ ] Patient gets a notification when doctor creates prescription
- [ ] Prescription lifecycle: `active → dispensed → completed → archived`

### Phase 4 — Notifications System
- [ ] Patient gets alerted when prescription is dispensed
- [ ] Doctor gets confirmation when pharmacist dispenses
- [ ] Medication reminders for patients (time-based alerts)
- [ ] Email notifications via Nodemailer

### Phase 5 — Doctor Analytics Dashboard
- [ ] Most prescribed medications chart
- [ ] Patient visit frequency graph
- [ ] Prescription completion rates
- [ ] Monthly/weekly prescription trends

### Phase 6 — Pharmacist Inventory
- [ ] Track which medicines are in stock
- [ ] Alert when a prescribed medicine is out of stock
- [ ] Full dispensing history with timestamps
- [ ] Low stock warnings

### Phase 7 — Security Upgrades
- [ ] JWT-based authentication (replace sessions)
- [ ] Rate limiting on OTP verification
- [ ] Audit logs for all prescription actions
- [ ] Two-factor authentication for doctors

### Recommended Build Order
```
1. OTP expiry + single use          ← security first
2. Link prescription to patient     ← core connection
3. Patient medical history page     ← patient value
4. Email notifications              ← engagement
5. Doctor analytics                 ← doctor value
6. Pharmacist inventory             ← pharmacist value
7. Security upgrades                ← production ready
```

---

## 🔌 API Endpoints

### Auth
| Method | URL | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get current user |

### Doctor
| Method | URL | Description |
|---|---|---|
| GET | `/doctor/api/prescriptions` | Get all prescriptions by doctor |
| POST | `/doctor/api/prescriptions` | Create new prescription |

### Patient
| Method | URL | Description |
|---|---|---|
| GET | `/patient/api/prescriptions` | Get patient's prescriptions |
| GET | `/patient/api/reminders` | Get today's reminders |
| PATCH | `/patient/api/reminders/:id/taken` | Mark reminder as taken |

### Pharmacist
| Method | URL | Description |
|---|---|---|
| POST | `/pharmacist/api/verify-otp` | Verify prescription OTP |
| PATCH | `/pharmacist/api/dispense/:id` | Mark prescription as dispensed |

---

## 📦 Dependencies

```json
{
  "express": "^4.x",
  "mongoose": "^8.x",
  "bcryptjs": "^2.x",
  "express-session": "^1.x",
  "dotenv": "^16.x"
}
```

---

## 👨‍💻 Built by Vedant
*Medify — Making healthcare digital, one prescription at a time.*