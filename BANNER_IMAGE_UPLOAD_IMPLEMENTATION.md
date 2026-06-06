# Banner Image Upload Implementation

## Overview
Added file upload capability to the banner system, allowing admins to upload images directly from their device instead of relying solely on URL input.

## What Changed

### Backend Changes

#### 1. **bannerRoutes.js** - Added Multer Configuration
- **Disk Storage**: Uploads stored in `uploads/banners/` directory
- **File Naming**: `banner-{timestamp}-{random}-{originalname}` format for unique names
- **File Size Limit**: 5MB maximum
- **MIME Type Validation**: Only JPEG, PNG, WebP, and GIF allowed
- **Routes Updated**: 
  - `POST /api/v1/banners` - Now includes `upload.single('image')` middleware
  - `PUT /api/v1/banners/:id` - Now includes `upload.single('image')` middleware

#### 2. **bannerController.js** - Dual-Mode Image Handling

**createBanner() Function**:
- Checks for uploaded file first: `req.file` → uses `/uploads/banners/{filename}`
- Falls back to URL: `req.body.imageUrl` → uses provided URL
- Throws error if neither file nor URL provided

**updateBanner() Function**:
- If file uploaded: Updates to new file path
- Else if URL provided: Updates to new URL
- Else: Keeps existing image unchanged

### Frontend Changes

#### **AdminBannerFormPage.jsx** - Complete File Upload UI

**State Management** (added):
```javascript
const [imageFile, setImageFile] = useState(null);           // Tracks selected file
const [imagePreview, setImagePreview] = useState(null);     // Tracks preview data URL
```

**Event Handlers** (added):
- `handleImageUpload()`: Converts file to data URL for preview
- `clearImageUpload()`: Removes selected file and resets preview

**Form Submission** (updated):
- Uses `FormData` for multipart/form-data requests
- File upload has priority over URL input
- Properly sets Content-Type header for multipart data

**UI Components** (added):
1. **File Input Section**
   - File input with drag-and-drop support
   - Accepts: JPEG, PNG, WebP, GIF
   - Clear button when file selected
   - File name display with success indicator

2. **Image Preview Section**
   - Shows uploaded file preview or existing image
   - Placeholder when no image selected
   - Recommended dimensions: 1400x400px

3. **URL Fallback Section**
   - URL input field for non-file uploads
   - Helpful text: "File upload has priority"

## Technical Implementation

### Request Flow

**New Banner Creation with File**:
1. Admin selects image file via input
2. File preview generated using FileReader API
3. Form submitted with FormData containing file + metadata
4. Multer intercepts request, validates file, saves to disk
5. Controller receives `req.file` with filename
6. Image URL stored as `/uploads/banners/banner-{unique}-name.jpg`
7. Banner saved to database with image URL

**Fallback with URL**:
1. Admin pastes image URL (no file selected)
2. Form submitted with imageUrl in FormData
3. Multer processes request (no file to upload)
4. Controller receives `req.body.imageUrl`
5. Banner saved with URL as-is

### File Structure
```
backend/
  uploads/
    banners/                    # NEW: Stores uploaded banner images
      banner-1234567890-xxx-example.jpg
      banner-1234567891-yyy-sale.png
```

## Browser Compatibility
- FileReader API: All modern browsers (Chrome, Firefox, Safari, Edge)
- FormData API: All modern browsers
- Max file size: 5MB per image

## Security Features
1. **File Type Validation**: Only image MIME types allowed
2. **File Size Limit**: 5MB maximum
3. **Unique Filenames**: Prevents overwriting existing files
4. **Route Protection**: `protect` and `admin` middleware on upload routes

## Usage Guide

### For Admins (Frontend)

**Creating a Banner with Image Upload**:
1. Go to Admin Panel → Manage Banners → Add New
2. Fill in Title, Subtitle, CTA Text, etc.
3. Click "Upload Image from Device"
4. Select image file from computer (JPEG/PNG/WebP/GIF, max 5MB)
5. Preview appears automatically
6. Click Save

**Creating a Banner with URL**:
1. Go to Admin Panel → Manage Banners → Add New
2. Leave file input empty
3. Paste image URL in "Or Paste Image URL" field
4. Click Save

**Editing a Banner**:
- Existing image shows in preview
- Upload new file to replace OR
- Paste new URL to replace OR
- Leave both empty to keep existing image

### For Developers

**Upload Endpoint**:
```
POST /api/v1/banners
Content-Type: multipart/form-data

Form Fields:
- image (file, optional) - Banner image file
- title (required)
- subtitle (optional)
- ctaText (optional)
- ctaLink (optional)
- ... other banner fields
- imageUrl (optional) - Fallback if no file
```

## Testing Checklist

- [ ] Upload PNG image, verify it saves and displays
- [ ] Upload JPEG image, verify it saves and displays
- [ ] Try uploading 6MB file, verify error message
- [ ] Try uploading PDF, verify rejection
- [ ] Use URL fallback, verify it works
- [ ] Edit existing banner with new file, verify update
- [ ] Edit existing banner without file, verify image unchanged
- [ ] Delete banner, verify file not served anymore

## Troubleshooting

**Images not showing after upload?**
- Check `uploads/banners/` directory exists
- Verify Express serving static files from `/uploads`
- Check browser console for 404 errors

**"Invalid file type" error?**
- Ensure file is JPEG, PNG, WebP, or GIF
- Check file extension matches content type

**"File too large" error?**
- Reduce image size below 5MB
- Use image compression tools (TinyPNG, ImageOptim)

## Future Enhancements
- [ ] Image cropping before upload
- [ ] Multiple banner images per slide
- [ ] Image optimization/compression
- [ ] CDN integration for storage
- [ ] Drag-and-drop file upload
