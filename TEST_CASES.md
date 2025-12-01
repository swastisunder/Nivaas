## Manual Test Scenarios

The following checklist covers end-to-end manual verification for the entire Nivaas application before deploying to production. Unless noted, run the server with `NODE_ENV=production` settings connected to a staging MongoDB that mirrors production data policies.

### 0. Test Environment Prep
- Seed DB using `npm run init-db`; confirm at least one demo listing, user, and category set.
- Ensure `.env` contains valid `SESSION_SECRET`, Cloudinary credentials, and Mongo URI.
- Clear browser cache/cookies between auth-related tests to avoid stale sessions.

### 1. Global Smoke Tests
- **Landing Redirect**  
  Steps: Visit `/`.  
  Expected: Redirects to `/listings`, navbar renders with logo/search/categories, no console errors.
- **Theme Toggle (Desktop & Mobile)**  
  Steps: Toggle moon icon in navbar + mobile menu; reload page.  
  Expected: Data-theme switches light/dark and persists after reload; icons stay in sync.
- **Flash Messages Auto-hide**  
  Steps: Trigger any success/error (e.g., invalid login).  
  Expected: Flash banner appears, slides out after ~3s, removed from DOM.

### 2. Navigation & Responsive Checks
- **Hamburger Menu**  
  Steps: Resize to ≤820px, tap hamburger.  
  Expected: Mobile menu slides open/close; links clickable; focus trap not required but no layout shift.
- **Unauthenticated CTA Visibility**  
  Steps: While logged out, verify navbar shows `Host now`, `Sign Up`, `Log In`; listing show page displays `Book / Checkout`.  
  Expected: CTAs render; clicking `Host now` or `Book / Checkout` redirects to `/login` with flash message and `redirectUrl` stored.

### 3. Authentication Flows
- **Sign Up Success**  
  Steps: Submit unique username/email/password.  
  Expected: Redirect to `/listings`, welcome flash, auto-login session created.
- **Sign Up Duplicates**  
  Steps: Reuse existing email/username.  
  Expected: Remain on `/signup`, error flash `Email already in use` or `Username already taken`, no user created.
- **Login Success & Redirect**  
  Steps: Attempt to access `/listings/new` logged out → redirected to `/login`, then log in.  
  Expected: Upon login, redirected back to `/listings/new`; flash `Welcome Back …`.
- **Login Failure**  
  Steps: Submit wrong password.  
  Expected: Stay on `/login`, `failureFlash` message displayed.
- **Logout**  
  Steps: Click `Log Out`.  
  Expected: Session destroyed, flash `you are logged out!`, redirected to `/login`; visiting `/profile` now redirects to login.

### 4. Listings Browsing
- **Category Filter**  
  Steps: Click each category pill.  
  Expected: URL includes `?category=…`, cards show only matching listings, “No listings found” when none.
- **Search Bar**  
  Steps: Enter term matching title/location/country; test case-insensitive and nonexistent query.  
  Expected: Results filtered accordingly, empty state message when none.
- **Listing Card Navigation**  
  Steps: Click card.  
  Expected: Loads show page with details, reviews, map placeholder.

### 5. Listing CRUD (Authenticated Owner)
Use demo account that owns at least one listing.
- **Create Listing**  
  Steps: `/listings/new`, fill fields, select multiple categories, upload image ≤10MB.  
  Expected: Validation prevents missing fields or price < 500; after submit, redirected to new listing, flash success, image hosted on Cloudinary.
- **Edit Listing**  
  Steps: `/listings/:id/edit`, change text, replace image, adjust categories.  
  Expected: Existing values pre-filled; after save, old image removed from Cloudinary, new data persists.
- **Delete Listing**  
  Steps: Use delete form.  
  Expected: Listing removed, flash success, reviews associated deleted (verify in DB).
- **Authorization Guard**  
  Steps: Attempt to edit/delete listing owned by another user by visiting URL.  
  Expected: Flash `You don't have permission!`, redirected to show page.

### 6. Reviews
- **Create Review**  
  Steps: Logged in non-owner submits rating/comment.  
  Expected: Review appears immediately with correct author, rating stars, flash success.
- **Validation Errors**  
  Steps: Submit review without rating/comment (disable HTML validation).  
  Expected: Server returns 400 error page or validation flash (depending on middleware handling).
- **Delete Own Review**  
  Steps: Author clicks delete.  
  Expected: Review removed, flash success.  
- **Cannot Delete Others’ Review**  
  Steps: Another user attempts delete via direct URL.  
  Expected: Flash permission error, review untouched.

### 7. Booking / Checkout
- **CTA Behavior (Logged Out)**  
  Steps: On listing show page as guest, click `Book / Checkout`.  
  Expected: Redirect to `/login`, original URL stored; after login, redirected to `/checkout/:id`.
- **Checkout Form Happy Path**  
  Steps: With future check-in/out dates, fill name + mobile, submit.  
  Expected: Booking saved, flash success, redirect `/profile`, booking card displays nights, total price, payment method.
- **Date Validation**  
  Steps: Set checkout before check-in, or check-in past date (manipulate HTML min).  
  Expected: Client-side blocks with custom validity; server also validates and flashes error, preventing booking.
- **Missing Fields**  
  Steps: Leave name/mobile blank (bypass HTML).  
  Expected: Server rejects (should confirm booking model requires fields -> expect 400/error).

### 8. Profile & Account Management
- **Profile View**  
  Steps: Visit `/profile` logged in.  
  Expected: Shows username, bookings list sorted newest first; each booking includes listing link, dates, payment info.
- **Edit Username**  
  Steps: `/profile/edit`, change username to unique value.  
  Expected: Validation prevents blank/duplicate; on success flash confirmation and session reflects new username (check navbar greeting or profile data).

### 9. Error Handling & Edge Cases
- **404 Page**  
  Steps: Visit random path `/foo/bar`.  
  Expected: Renders `listings/error.ejs` with 404 message.
- **Deleted Listing Booking Access**  
  Steps: Try `/checkout/:deletedId`.  
  Expected: Flash `Listing not found`, redirect `/listings`.
- **Session Persistence**  
  Steps: Close browser, reopen within 7 days, revisit site.  
  Expected: Remains logged in (session cookie `httpOnly`, correct expiry).
- **Mongo/Server Errors**  
  Steps: Temporarily break DB connection (stop Mongo) before request.  
  Expected: Server logs failure, reactions per environment (dev warns, prod exits).

### 10. Responsive & Accessibility Spot Checks
- Validate layout at 320px, 768px, 1024px widths; ensure cards wrap, text readable.
- Keyboard navigate navbar + forms; focus indicators visible.
- Images have alt text (listing images, icons decorative via `<i>`—confirm ARIA impact).

### 11. Regression Checks for Recent Fixes
- **Mobile Hamburger**: Ensure repeated toggle doesn’t cause scroll lock or overflow; test on actual touch device if possible.
- **Unauthenticated Host Button**: Confirm both desktop and mobile nav show CTA and redirect to login without 404.
- **Unauthenticated Book Button**: On listings where user is owner, button hidden; for guests or non-owners, button present and routes as described.

Document any failures with reproduction steps, console/network traces, and server logs for triage before deployment.

