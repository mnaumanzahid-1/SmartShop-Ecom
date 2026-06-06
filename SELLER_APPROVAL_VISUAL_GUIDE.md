# Seller Approval Flow - Visual Architecture

## System Overview Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        SMARTSHOP PLATFORM                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│   NEW USER       │
│   (Not Logged)   │
└────────┬─────────┘
         │
         ├─ Visit /sell-on-smartshop
         ├─ Click "Start Selling"
         ├─ Redirect to /signup?role=seller
         └─ Create Account (role: 'buyer')
              ↓
         ┌────────────────────────┐
         │  Logged In As Buyer    │
         │  (role: 'buyer')       │
         │  navbar: "Become       │
         │  a Seller"             │
         └────────────┬───────────┘
                      │
                      ├─ Click "Become a Seller"
                      ├─ → /seller/terms
                      ├─ Read Terms & Conditions
                      ├─ Accept Checkbox
                      └─ Submit Application
                           ↓
         ┌────────────────────────────────┐
         │  Pending Application Submitted  │
         │  (role: 'seller_pending')      │
         │  navbar: "Application Status"  │
         │          (blue link)            │
         └────────────┬───────────────────┘
                      │
              ┌───────┴────────┐
              │                │
    ADMIN REVIEW          USER WAITS
              │
    ┌─────────▼────────────────────────────────┐
    │  /admin/seller-applications               │
    │  Admin reviews pending applications       │
    └─────────┬────────────────────────────────┘
              │
         ┌────┴────────┐
         │             │
    ┌────▼─────┐  ┌───▼──────┐
    │ APPROVE   │  │ REJECT   │
    │           │  │          │
    ├─────┬─────┤  ├────┬─────┤
    │ PUT │     │  │PUT │     │
    │/app│rove │  │/re │ject │
    └─────┼─────┘  └────┼─────┘
          │             │
          ▼             ▼
    ┌──────────┐   ┌────────────┐
    │Approved! │   │ Rejected   │
    │          │   │  (reason)  │
    │role:     │   │            │
    │'seller'  │   │role:'buyer'│
    └────┬─────┘   └────┬───────┘
         │              │
         │         Can Reapply?
         │           /reapply
         │              │
         ▼              ▼
    ┌──────────────────────────┐
    │ Seller Dashboard Access  │
    │ navbar: "Seller          │
    │ Dashboard" (orange)      │
    │                          │
    │ /seller/dashboard ✓      │
    │ /seller/add-product ✓    │
    └──────────────────────────┘
```

---

## User Role Matrix

```
┌─────────────────┬──────┬──────┬──────┬──────────────────────────┐
│ FEATURE         │BUYER │SELLER│PEND. │ADMIN                     │
│                 │(USER)│APPROV│SELLER│                          │
├─────────────────┼──────┼──────┼──────┼──────────────────────────┤
│Browse Products  │  ✓   │  ✓   │  ✓   │  ✓                       │
│Add to Cart      │  ✓   │  ✓   │  ✓   │  ✓                       │
│Checkout/Order   │  ✓   │  ✓   │  ✓   │  ✓                       │
│Track Orders     │  ✓   │  ✓   │  ✓   │  ✓                       │
│View Profile     │  ✓   │  ✓   │  ✓   │  ✓                       │
│                 │      │      │      │                          │
│Become Seller    │  ✓   │  ✗   │  ✗   │  ✗                       │
│Terms & Cond.    │  ✓   │  ✗   │  ✗   │  ✗                       │
│Apply for Seller │  ✓   │  ✗   │  ✗   │  ✗                       │
│Check App Status │  ✓   │  ✗   │  ✓   │  ✗                       │
│                 │      │      │      │                          │
│Seller Dashboard │  ✗   │  ✓   │  ✗   │  ✗                       │
│Add Products     │  ✗   │  ✓   │  ✗   │  ✗                       │
│View Sales       │  ✗   │  ✓   │  ✗   │  ✗                       │
│Manage Products  │  ✗   │  ✓   │  ✗   │  ✗                       │
│                 │      │      │      │                          │
│Admin Dashboard  │  ✗   │  ✗   │  ✗   │  ✓                       │
│Manage Users     │  ✗   │  ✗   │  ✗   │  ✓                       │
│Review Apps      │  ✗   │  ✗   │  ✗   │  ✓                       │
│Approve Sellers  │  ✗   │  ✗   │  ✗   │  ✓                       │
│Manage Products  │  ✗   │  ✗   │  ✗   │  ✓                       │
│Manage Orders    │  ✗   │  ✗   │  ✗   │  ✓                       │
└─────────────────┴──────┴──────┴──────┴──────────────────────────┘
```

---

## Route Access Control

```
PUBLIC ROUTES:
  /                      → HomePage
  /product/:id           → ProductDetails
  /search/:keyword       → SearchPage
  /login                 → LoginPage
  /signup                → SignupPage
  /sell-on-smartshop     → SellerLandingPage
  /about, /privacy, etc. → StaticPages

PROTECTED (Any Authenticated User):
  /profile               → ProfilePage
  /checkout              → CheckoutPage
  /seller/terms          → SellerTermsPage (Terms & Conditions)
  /seller/application-status → Status Tracking

SELLER ONLY (role='seller'):
  /seller/dashboard      → SellerDashboardPage
  /seller/add-product    → AddProductPage

ADMIN ONLY (role='admin'):
  /admin                 → AdminDashboard
  /admin/products        → ProductManagement
  /admin/orders          → OrderManagement
  /admin/users           → UserManagement
  /admin/seller-applications → Review Applications
```

---

## Application Status Flow

```
┌──────────────────────────────────────────────────────────┐
│ sellerApplicationStatus Values                           │
└──────────────────────────────────────────────────────────┘

'not_applied'  →  User hasn't submitted application yet
   ↓ (User clicks "Apply")
'pending'      →  Application submitted, awaiting admin review
   ├─ (Admin approves)
   │  ↓
   │  'approved' → Role changes to 'seller' ✓ Dashboard access
   │
   └─ (Admin rejects)
      ↓
      'rejected'  → Role reverts to 'buyer', shows rejection reason
         │
         └─ (User clicks "Reapply")
            ↓
            'pending'  → Resubmitted for review
```

---

## Backend API Endpoints

```
SELLER APPLICATION ROUTES:
┌──────────────────────────────────────────────────────────────┐
│ POST   /api/v1/seller-applications/apply                     │
│        → User applies to become seller                       │
│        ← User role changes to 'seller_pending'               │
├──────────────────────────────────────────────────────────────┤
│ GET    /api/v1/seller-applications/status                    │
│        → Check current application status                    │
│        ← Returns: status, role, dates, rejection reason      │
├──────────────────────────────────────────────────────────────┤
│ POST   /api/v1/seller-applications/reapply                   │
│        → Rejected seller can reapply                         │
│        ← Status changes back to 'pending'                    │
├──────────────────────────────────────────────────────────────┤
│ GET    /api/v1/seller-applications (ADMIN)                   │
│        → List all pending applications                       │
│        ← Array of pending seller applications                │
├──────────────────────────────────────────────────────────────┤
│ PUT    /api/v1/seller-applications/:userId/approve (ADMIN)  │
│        → Admin approves seller                               │
│        ← Role changes to 'seller', approval date set         │
├──────────────────────────────────────────────────────────────┤
│ PUT    /api/v1/seller-applications/:userId/reject (ADMIN)   │
│        → Admin rejects with reason                           │
│        ← Role reverts to 'buyer', rejection reason stored    │
└──────────────────────────────────────────────────────────────┘
```

---

## Navbar Role-Based Links

```
NOT LOGGED IN:
┌─────────────────────────────┐
│ Login | Sign Up | Cart (0)  │
└─────────────────────────────┘

LOGGED IN (role='buyer'):
┌─────────────────────────────────────────┐
│ User Dropdown ▼                         │
│ ├─ Become a Seller (gray text)          │
│ ├─ My Profile                           │
│ ├─ My Orders                            │
│ └─ Disconnect Link                      │
│ Cart (n)                                │
└─────────────────────────────────────────┘

LOGGED IN (role='seller_pending'):
┌─────────────────────────────────────────┐
│ User Dropdown ▼                         │
│ ├─ Application Status (blue text)       │
│ ├─ My Profile                           │
│ ├─ My Orders                            │
│ └─ Disconnect Link                      │
│ Cart (n)                                │
└─────────────────────────────────────────┘

LOGGED IN (role='seller'):
┌─────────────────────────────────────────┐
│ User Dropdown ▼                         │
│ ├─ Seller Dashboard (orange text)       │
│ ├─ My Profile                           │
│ ├─ My Orders                            │
│ └─ Disconnect Link                      │
│ Cart (n)                                │
└─────────────────────────────────────────┘

LOGGED IN (role='admin'):
┌─────────────────────────────────────────┐
│ User Dropdown ▼                         │
│ ├─ Admin Dashboard (orange text)        │
│ ├─ My Profile                           │
│ ├─ My Orders                            │
│ └─ Disconnect Link                      │
│ Cart (n)                                │
└─────────────────────────────────────────┘
```

---

## Frontend Components Structure

```
src/components/
├── SellerRoute.jsx ✓ (UPDATED)
│   └─ Checks: user?.role === 'seller'
│      Redirects to: /seller (if not approved seller)
│
└── Navbar.jsx ✓ (UPDATED)
   └─ Shows role-based dropdown links
      - Admin: Admin Dashboard
      - Seller: Seller Dashboard
      - Pending: Application Status
      - Buyer: Become a Seller

src/pages/
├── seller/
│   ├── SellerTermsPage.jsx ✓ (NEW)
│   │   └─ 7 sections of Terms & Conditions
│   │      Form submission to /apply endpoint
│   │
│   ├── SellerApplicationStatusPage.jsx ✓ (NEW)
│   │   └─ Shows: pending/approved/rejected status
│   │      Actions: View Details, Reapply, Dashboard
│   │
│   ├── SellerDashboardPage.jsx ✓ (EXISTING)
│   │   └─ Only for approved sellers (role='seller')
│   │
│   └── AddProductPage.jsx ✓ (EXISTING)
│       └─ Only for approved sellers (role='seller')
│
├── admin/
│   ├── AdminSellerApplicationsPage.jsx ✓ (NEW)
│   │   └─ Grid of pending applications
│   │      Search, Review, Approve/Reject modal
│   │
│   └── other admin pages...
│
├── SellerLandingPage.jsx ✓ (UPDATED)
│   └─ Redirects approved sellers to dashboard
│      Handles both logged-in and not logged-in users
│
└── other pages...
```

---

## Data Model

```
User Collection Changes:
┌─────────────────────────────────────────┐
│ User Schema (Updated)                   │
├─────────────────────────────────────────┤
│ _id: ObjectId                           │
│ name: String                            │
│ email: String (unique)                  │
│ password: String (hashed)               │
│                                         │
│ role: String ✓ UPDATED ENUM            │
│   - 'buyer' (default)                   │
│   - 'seller_pending'                    │
│   - 'seller'                            │
│   - 'admin'                             │
│                                         │
│ sellerApplicationStatus: String ✓ NEW  │
│   - 'not_applied' (default)             │
│   - 'pending'                           │
│   - 'approved'                          │
│   - 'rejected'                          │
│                                         │
│ sellerApplicationDate: Date ✓ NEW      │
│ sellerApprovedDate: Date ✓ NEW         │
│ sellerRejectionReason: String ✓ NEW    │
│ createdAt: Date                         │
└─────────────────────────────────────────┘
```

---

## Implementation Checklist

✅ Database Schema Updated (User Model)
✅ Backend Controllers Created (Seller Application)
✅ Backend Routes Created & Registered
✅ Frontend Components Created
  ✅ SellerTermsPage
  ✅ SellerApplicationStatusPage
  ✅ AdminSellerApplicationsPage
✅ Existing Components Updated
  ✅ SellerLandingPage
  ✅ SellerRoute
  ✅ Navbar
✅ Routes Configuration Updated (App.jsx)
✅ Server Configuration Updated (Register new routes)
✅ Design Consistency Maintained
✅ Security Validations Implemented
✅ Error Handling Added
✅ Comprehensive Documentation Created

---

## Security Features

```
FRONTEND PROTECTION:
  ✓ SellerRoute checks user?.role === 'seller'
  ✓ Redirects unauthorized users to /seller
  ✓ Navbar links are role-aware
  ✓ Forms validate before submission

BACKEND PROTECTION:
  ✓ All endpoints require authentication (protect middleware)
  ✓ Admin endpoints require role='admin'
  ✓ Role validation on every request
  ✓ Application status verified before operations
  ✓ No hardcoded access to admin functions
  ✓ Error messages don't reveal implementation details

DATABASE PROTECTION:
  ✓ Role enum prevents invalid values
  ✓ Status enum prevents invalid values
  ✓ User can only modify their own application
  ✓ Admin actions are logged implicitly
```

---

**Version:** 1.0 Final
**Date:** January 27, 2026
**Status:** ✅ Ready for Production
