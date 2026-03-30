// translations.js - Language translations for Ecovera app
const translations = {
  en: {
    // Common/Shared
    "app_name": "Ecovera",
    "app_subtitle": "Recycle. Earn. Save the Planet.",
    "continue": "Continue",
    "submit": "Submit",
    "save": "Save",
    "cancel": "Cancel",
    "back": "Back",
    "edit": "Edit",
    "delete": "Delete",
    "edit_address": "Edit Address",
    "yes": "Yes",
    "no": "No",
    "ok": "OK",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",

    // Login Page
    "login_title": "Login to Get Started",
    "login_subtitle": "Enter your mobile number to continue",
    "mobile": "Mobile Number",
    "mobile_number": "Mobile Number",
    "otp_helper": "OTP will be sent to your mobile number",
    "enter_valid_mobile": "Please enter a valid 10-12 digit mobile number",

    // OTP Page
    "otp_title": "OTP Verification",
    "otp_subtitle": "Enter the 6-digit code sent to your mobile",
    "enter_otp": "Enter OTP",
    "otp_placeholder": "Enter OTP",
    "resend": "Resend",
    "otp_helper_dev": "If this is a demo, check console for the simulated OTP.",
    "dev_otp": "Dev OTP",

    // Role Page
    "choose_role_title": "Choose Your Role",
    "choose_role_subtitle": "Select how you want to use Ecovera",
    "seller_role": "Seller",
    "buyer_role": "Buyer",

    // Profile Page
    "profile_title": "Complete Your Profile",
    "profile_subtitle": "Tell us a bit about yourself",
    "full_name": "Full Name",
    "email": "Email Address",
    "enter_name": "Enter your full name",
    "enter_email": "Enter your email address",

    // Location Page
    "location_title": "Add Your Location",
    "location_subtitle": "Help us locate you for pickup services",
    "pin_code": "Pin Code",
    "state": "State",
    "city": "City",
    "landmark": "Landmark (Optional)",
    "house_no": "House No./Building Name",
    "village_building_number": "Village/Building Number",
    "enter_village_building": "Enter village/building number",
    "enter_pin": "Enter 6-digit pin code",
    "enter_state": "Enter your state",
    "enter_city": "Enter your city",
    "enter_landmark": "Enter nearby landmark",
    "enter_house": "Enter house/building details",
    "detect_my_location": "Detect My Location",
    "detecting_location": "Detecting...",

    // Language Page
    "language_title": "Select Your Language",
    "language_subtitle": "Choose your preferred language from the options below",
    "english": "English",
    "english_native": "Default Language",
    "kannada": "ಕನ್ನಡ",
    "kannada_native": "Kannada",
    "hindi": "हिन्दी",
    "hindi_native": "Hindi",

    // Recycler Setup
    "recycler_setup": "Recycler Setup",
    "business_name": "Business Name",
    "enter_business_name": "Enter your business name",
    "business_type": "Business Type",
    "select_business_type": "Select business type",
    "recycling_plant": "Recycling Plant",
    "collection_center": "Collection Center",
    "scrap_dealer": "Scrap Dealer",
    "other": "Other",
    "enter_mobile": "Mobile number",
    "continue_to_home": "Continue to Home",

    // Home/Dashboard
    "greeting_morning": "Good Morning",
    "greeting_afternoon": "Good Afternoon",
    "greeting_evening": "Good Evening",
    "your_location": "Your location",
    "location_format": "{city}, {state} - {pin}",
    "earned_so_far": "Earned So Far",
    "waste": "Waste",
    "pickups": "Pickups",
    "trees_saved": "Trees Saved",
    "environmental_impact": "Your Environmental Impact",
    "impact_description": "Show Bar Graph + Pie Chart for Waste recycled and Trees saved.",
    "view_impact": "View Impact",

    // Sell Scrap
    "sell_scrap": "Sell Scrap",
    "search_waste": "Search waste types",
    "categories_prices": "Categories & Prices",
    "paper": "Paper",
    "paper_desc": "Cardboard, Books...",
    "metal": "Metal",
    "metal_desc": "Iron, Copper, Steel...",
    "plastic": "Plastic",
    "plastic_desc": "Bottles, Dairy Packets...",
    "glass": "Glass",
    "glass_desc": "Glass Bottles...",
    "quick_upload": "Quick Upload",
    "quick_upload_desc": "Need to upload now? Go directly to the 2-step waste upload.",

    // Sell Details
    "category_details": "Category Details",
    "detailed_pricing": "Check detailed pricing for selected waste types.",
    "search_specific": "Search a specific type (e.g., Newspaper)",
    "paper_pricing": "Paper Pricing",
    "metal_pricing": "Metal Pricing",
    "plastic_pricing": "Plastic Pricing",
    "glass_pricing": "Glass Pricing",
    "cardboard": "Cardboard",
    "newspaper": "Newspaper",
    "books": "Books",
    "mixed_paper": "Mixed Paper",
    "magazines": "Magazines",
    "iron": "Iron",
    "copper": "Copper",
    "steel": "Steel",
    "mixed_plastics": "Mixed Plastics",
    "plastic_bottles": "Plastic Bottles (PET)",
    "dairy_packets": "Dairy Packets (LDPE)",
    "glass_bottles": "Glass Bottles",
    "quantity_kg": "Quantity (kg):",
    "estimated_price": "Estimated Price",



    // Upload Waste
    "upload_waste_1": "Upload Waste (1/2)",
    "upload_desc_1": "Upload image & enter estimated quantity.",
    "waste_type": "Waste Type",
    "estimated_quantity": "Estimated Quantity (kg)",
    "estimated_quantity_kg": "Estimated Quantity (kg)",
    "quantity_placeholder": "e.g.,5.5 kg",
    "upload_image": "Upload Image",
    "upload_waste_2": "Confirm Pickup (2/2)",
    "confirm_desc": "Confirm your address and submit the request.",
    "pickup_address": "Pickup Address",
    "change_address": "Change Address",
    "submit_pickup": "Submit Pickup Request",
    "confirm_pickup_2": "Confirm Pickup (2/2)",
    "go_back_to_categories": "Go Back to Categories",
    "submit_pickup_request": "Submit Pickup Request",

    // Edit Profile
    "edit_profile": "Edit Profile",
    "update_details": "Update your personal details.",
    "save_changes": "Save Changes",
    "delete_account": "Delete Account",

    // Saved Address
    "saved_address": "Saved Address",
    "manage_locations": "Manage your pickup locations.",
    "default_address": "Default Address (Current)",
    "default_address_current": "Default Address (Current)",
    "add_new_address": "Add New Address",
    "go_back_dashboard": "Go Back to Dashboard",
    "go_back_to_dashboard": "Go Back to Dashboard",

    // Add New Address
    "add_new_address_title": "Add New Address",
    "enter_details": "Enter the details for your new pickup location.",
    "address_name": "Name (e.g., Home, Office)",
    "address_placeholder": "Enter a friendly name for this address",
    "address_line_1": "Address Line 1 (Flat/House No., Building Name)",
    "address_line_1_placeholder": "Flat 101, Green Apartments",
    "address_line_2": "Address Line 2 (Street, Locality)",
    "address_line_2_placeholder": "Brigade Road, Ashok Nagar",
    "pincode": "Pincode / Zipcode",
    "pincode_placeholder": "560001",
    "city_placeholder": "Bengaluru",
    "state_placeholder": "Karnataka",
    "set_default": "Set as default pickup address",
    "save_address": "Save Address",

    // Navigation
    "home": "Home",
    "sell_waste": "Sell Scrap",
    "orders": "Orders",

    // Menu
    "change_language": "Change Language",
    "edit_profile": "Edit Profile",
    "saved_address": "Saved Address",
    "logout": "Logout",

    // Messages/Alerts
    "profile_updated": "Profile updated successfully!",
    "address_saved": "Address saved successfully!",
    "pickup_submitted": "Pickup request submitted successfully!",
    "select_waste": "Please select at least one waste type and enter quantity",
    "enter_address": "Please enter pickup address",
    "fill_fields": "Please fill in all fields",
    "missing_otp_mobile": "Missing OTP or mobile number",
    "otp_verification_failed": "OTP verification failed",
    "failed_send_otp": "Failed to send OTP",
    "failed_update_profile": "Failed to update profile",
    "failed_update_location": "Failed to update location",
    "otp_expired": "OTP has expired",
    "invalid_otp": "Invalid OTP",
    "no_otp_found": "No OTP found for this mobile number",
    "gmail_required": "Please enter a valid Gmail address (e.g., yourname@gmail.com)",
    "fill_all_fields": "Please fill in all fields",
    "failed_send_otp_prefix": "Failed to send OTP: ",
    "server_verification_failed_prefix": "Server verification failed: ",
    "failed_verify_otp_prefix": "Failed to verify OTP: ",
    "failed_verify_otp": "Failed to verify OTP. Please try again.",
    "otp_resent_success": "OTP resent successfully!",
    "failed_resend_otp_prefix": "Failed to resend OTP: ",
    "failed_resend_otp": "Failed to resend OTP. Please try again.",
    "fill_all_required_fields": "Please fill in all required fields",
    "error_saving_location": "Error saving location. Please try again.",
    "failed_save_profile": "Failed to save profile. Please try again.",
    "user_not_authenticated": "User not authenticated",
    "failed_save_order_prefix": "Failed to save order: ",
    "account_deletion_not_implemented": "Account deletion is not implemented yet.",
    "failed_save_address": "Failed to save address. Please try again.",
    "settings_title": "Settings",
    "settings_subtitle": "Manage your account preferences",
    "language_setting": "Language",
    "change": "Change",
    "notifications_setting": "Notifications",
    "profile_setting": "Profile",
    "location_setting": "Location",
    "privacy_setting": "Privacy",
    "help_support": "Help & Support",
    "about_app": "About Ecovera",
    "close": "Close",
    "manage": "Manage",
    "view": "View",
    "version": "Version",
    "privacy_desc": "Control your data sharing preferences",
    "help_desc": "Get help and contact support",
    "about_desc": "Version 1.0.0"
  },

  kn: {
    // Common/Shared
    "app_name": "ಇಕೋವೆರಾ",
    "continue": "ಮುಂದುವರಿಸಿ",
    "submit": "ಸಲ್ಲಿಸಿ",
    "save": "ಉಳಿಸಿ",
    "cancel": "ರದ್ದುಗೊಳಿಸಿ",
    "back": "ಹಿಂತಿರುಗಿ",
    "edit": "ಸಂಪಾದಿಸಿ",
    "edit_address": "ವಿಳಾಸವನ್ನು ಸಂಪಾದಿಸಿ",
    "delete": "ಅಳಿಸಿ",
    "yes": "ಹೌದು",
    "no": "ಇಲ್ಲ",
    "ok": "ಸರಿ",
    "loading": "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    "error": "ದೋಷ",
    "success": "ಯಶಸ್ಸು",

    // Login Page
    "login_title": "ಪ್ರಾರಂಭಿಸಲು ಲಾಗಿನ್ ಮಾಡಿ",
    "login_subtitle": "ಮುಂದುವರಿಸಲು ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
    "mobile_number": "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    "otp_helper": "OTP ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ",
    "enter_valid_mobile": "ದಯವಿಟ್ಟು ಮಾನ್ಯ 10-12 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",

    // OTP Page
    "otp_title": "OTP ಪರಿಶೀಲನೆ",
    "otp_subtitle": "ನಿಮ್ಮ ಮೊಬೈಲ್‌ಗೆ ಕಳುಹಿಸಿದ 6-ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ",
    "enter_otp": "OTP ನಮೂದಿಸಿ",
    "otp_placeholder": "OTP ನಮೂದಿಸಿ",
    "resend": "ಮರುಕಳುಹಿಸಿ",
    "otp_helper_dev": "ಇದು ಡೆಮೋ ಆಗಿದ್ದರೆ, ಸಿಮ್ಯುಲೇಟೆಡ್ OTPಗಾಗಿ ಕನ್ಸೋಲ್ ಪರಿಶೀಲಿಸಿ.",
    "dev_otp": "ಡೆವ್ OTP",

    // Role Page
    "choose_role_title": "ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    "choose_role_subtitle": "ಇಕೋವೆರಾವನ್ನು ನೀವು ಹೇಗೆ ಬಳಸಲು ಬಯಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    "seller_role": "ಮಾರಾಟಗಾರ",
    "buyer_role": "ಖರೀದಿದಾರ",

    // Profile Page
    "profile_title": "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ",
    "profile_subtitle": "ನಿಮ್ಮ ಬಗ್ಗೆ ಸ್ವಲ್ಪ ಹೇಳಿ",
    "full_name": "ಪೂರ್ಣ ಹೆಸರು",
    "email": "ಇಮೇಲ್ ವಿಳಾಸ",
    "enter_name": "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ",
    "enter_email": "ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ",

    // Location Page
    "location_title": "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಸೇರಿಸಿ",
    "location_subtitle": "ಪಿಕಪ್ ಸೇವೆಗಳಿಗಾಗಿ ನಿಮ್ಮನ್ನು ಪತ್ತೆ ಮಾಡಲು ನಮಗೆ ಸಹಾಯ ಮಾಡಿ",
    "pin_code": "ಪಿನ್ ಕೋಡ್",
    "state": "ರಾಜ್ಯ",
    "city": "ನಗರ",
    "landmark": "ಲ್ಯಾಂಡ್‌ಮಾರ್ಕ್ (ಐಚ್ಛಿಕ)",
    "house_no": "ಮನೆ ಸಂಖ್ಯೆ/ಕಟ್ಟಡದ ಹೆಸರು",
    "village_building_number": "ಗ್ರಾಮ/ಕಟ್ಟಡ ಸಂಖ್ಯೆ",
    "enter_village_building": "ಗ್ರಾಮ/ಕಟ್ಟಡ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
    "enter_pin": "6-ಅಂಕಿಯ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ",
    "enter_state": "ನಿಮ್ಮ ರಾಜ್ಯ ನಮೂದಿಸಿ",
    "enter_city": "ನಿಮ್ಮ ನಗರ ನಮೂದಿಸಿ",
    "enter_landmark": "ಹತ್ತಿರದ ಲ್ಯಾಂಡ್‌ಮಾರ್ಕ್ ನಮೂದಿಸಿ",
    "enter_house": "ಮನೆ/ಕಟ್ಟಡದ ವಿವರಗಳು ನಮೂದಿಸಿ",
    "detect_my_location": "ನನ್ನ ಸ್ಥಳವನ್ನು ಪತ್ತೆ ಮಾಡಿ",
    "detecting_location": "ಪತ್ತೆ ಮಾಡುತ್ತಿದೆ...",

    // Language Page
    "language_title": "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    "language_subtitle": "ಕೆಳಗಿನ ಅಕ್ಷದಿಂದ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    "english": "English",
    "english_native": "ಡೀಫಾಲ್ಟ್ ಭಾಷೆ",
    "kannada": "ಕನ್ನಡ",
    "kannada_native": "ಕನ್ನಡ",
    "hindi": "हिन्दी",
    "hindi_native": "ಹಿಂದಿ",

    // Home/Dashboard
    "greeting_morning": "ಶುಭೋದಯ",
    "greeting_afternoon": "ಶುಭ ಮಧ್ಯಾಹ್ನ",
    "greeting_evening": "ಶುಭ ಸಂಜೆ",
    "your_location": "ನಿಮ್ಮ ಸ್ಥಳ",
    "location_format": "{city}, {state} - {pin}",
    "earned_so_far": "ಇಲ್ಲಿಯವರೆಗೆ ಗಳಿಸಿದ",
    "waste": "ತ್ಯಾಜ್ಯ",
    "pickups": "ಪಿಕಪ್‌ಗಳು",
    "trees_saved": "ಉಳಿಸಿದ ಮರಗಳು",
    "environmental_impact": "ನಿಮ್ಮ ಪರಿಸರೀಯ ಪರಿಣಾಮ",
    "impact_description": "ಮರುಬಳಕೆ ಮಾಡಿದ ತ್ಯಾಜ್ಯ ಮತ್ತು ಉಳಿಸಿದ ಮರಗಳಿಗೆ ಬಾರ್ ಗ್ರಾಫ್ + ಪೈ ಚಾರ್ಟ್ ತೋರಿಸಿ.",
    "view_impact": "ಪರಿಣಾಮವನ್ನು ವೀಕ್ಷಿಸಿ",
    // Sell Scrap
    "sell_scrap": "ಸ್ಕ್ರ್ಯಾಪ್ ಮಾರಾಟ",
    "search_waste": "ತ್ಯಾಜ್ಯ ಪ್ರಕಾರಗಳನ್ನು ಹುಡುಕಿ",
    "categories_prices": "ವರ್ಗಗಳು ಮತ್ತು ಬೆಲೆಗಳು",
    "paper": "ಕಾಗದ",
    "paper_desc": "ಕಾರ್ಡ್‌ಬೋರ್ಡ್, ಪುಸ್ತಕಗಳು...",
    "metal": "ಲೋಹ",
    "metal_desc": "ಕಬ್ಬಿಣ, ತಾಮ್ರ, ಉಕ್ಕು...",
    "plastic": "ಪ್ಲಾಸ್ಟಿಕ್",
    "plastic_desc": "ಬಾಟಲ್‌ಗಳು, ಹಾಲಿನ ಪ್ಯಾಕೆಟ್‌ಗಳು...",
    "glass": "ಗಾಜು",
    "glass_desc": "ಗಾಜಿನ ಬಾಟಲ್‌ಗಳು...",


    // Sell Details
    "category_details": "ವರ್ಗದ ವಿವರಗಳು",
    "detailed_pricing": "ಆಯ್ದ ತ್ಯಾಜ್ಯ ಪ್ರಕಾರಗಳಿಗೆ ವಿವರವಾದ ಬೆಲೆ ಪರಿಶೀಲಿಸಿ.",
    "search_specific": "ನಿರ್ದಿಷ್ಟ ಪ್ರಕಾರವನ್ನು ಹುಡುಕಿ (ಉದಾ., ಪತ್ರಿಕೆ)",
    "paper_pricing": "ಕಾಗದದ ಬೆಲೆ",
    "metal_pricing": "ಲೋಹದ ಬೆಲೆ",
    "plastic_pricing": "ಪ್ಲಾಸ್ಟಿಕ್‌ನ ಬೆಲೆ",
    "glass_pricing": "ಗಾಜಿನ ಬೆಲೆ",
    "cardboard": "ಕಾರ್ಡ್‌ಬೋರ್ಡ್",
    "newspaper": "ಪತ್ರಿಕೆ",
    "books": "ಪುಸ್ತಕಗಳು",
    "mixed_paper": "ಮಿಶ್ರ ಕಾಗದ",
    "magazines": "ಮ್ಯಾಗಜಿನ್‌ಗಳು",
    "iron": "ಕಬ್ಬಿಣ",
    "copper": "ತಾಮ್ರ",
    "steel": "ಉಕ್ಕು",
    "mixed_plastics": "ಮಿಶ್ರ ಪ್ಲಾಸ್ಟಿಕ್‌ಗಳು",
    "plastic_bottles": "ಪ್ಲಾಸ್ಟಿಕ್ ಬಾಟಲ್‌ಗಳು (PET)",
    "dairy_packets": "ಹಾಲಿನ ಪ್ಯಾಕೆಟ್‌ಗಳು (LDPE)",
    "glass_bottles": "ಗಾಜಿನ ಬಾಟಲ್‌ಗಳು",
    "quantity_kg": "ಪ್ರಮಾಣ (ಕೆಜಿ):",
    "estimated_price": "ಅಂದಾಜು ಬೆಲೆ",

    // Orders
    "waste_collection_orders": "ತ್ಯಾಜ್ಯ ಸಂಗ್ರಹ ಆದೇಶಗಳು",
    "view_orders": "ಎಲ್ಲಾ ತ್ಯಾಜ್ಯ ಸಂಗ್ರಹ ವಿನಂತಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    "all_orders": "ಎಲ್ಲಾ ಆದೇಶಗಳು",
    "pending_pickup": "ಪಿಕಪ್ ಬಾಕಿ ಇದೆ",
    "completed": "ಪೂರ್ಣಗೊಂಡ",
    "today": "ಇಂದು, {date}",
    "yesterday": "ನಿನ್ನೆ, {date}",
    "paper_waste_collection": "ಕಾಗದ ತ್ಯಾಜ್ಯ ಸಂಗ್ರಹ",
    "mixed_waste_collection": "ಮಿಶ್ರ ತ್ಯಾಜ್ಯ ಸಂಗ್ರಹ",
    "view_details": "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    "no_orders": "ಯಾವುದೇ ತ್ಯಾಜ್ಯ ಸಂಗ್ರಹ ಆದೇಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಹೊಸ ಆದೇಶ ರಚಿಸಲು \"ತ್ಯಾಜ್ಯ ಮಾರಾಟ\" ಕ್ಲಿಕ್ ಮಾಡಿ.",

    // Upload Waste
    "upload_waste_1": "ತ್ಯಾಜ್ಯ ಅಪ್‌ಲೋಡ್ (1/2)",
    "upload_desc_1": "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮತ್ತು ಅಂದಾಜು ಪ್ರಮಾಣ ನಮೂದಿಸಿ.",
    "waste_type": "ತ್ಯಾಜ್ಯ ಪ್ರಕಾರ",
    "estimated_quantity": "ಅಂದಾಜು ಪ್ರಮಾಣ (ಕೆಜಿ)",
    "estimated_quantity_kg": "ಅಂದಾಜು ಪ್ರಮಾಣ (ಕೆಜಿ)",
    "quantity_placeholder": "ಉದಾ.,5.5 ಕೆಜಿ",
    "upload_image": "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್",
    "upload_waste_2": "ಪಿಕಪ್ ದೃಢೀಕರಿಸಿ (2/2)",
    "confirm_desc": "ನಿಮ್ಮ ವಿಳಾಸವನ್ನು ದೃಢೀಕರಿಸಿ ಮತ್ತು ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಿ.",
    "pickup_address": "ಪಿಕಪ್ ವಿಳಾಸ",
    "change_address": "ವಿಳಾಸ ಬದಲಾಯಿಸಿ",
    "submit_pickup_request": "ಪಿಕಪ್ ವಿನಂತಿ ಸಲ್ಲಿಸಿ",
    "confirm_pickup_2": "ಪಿಕಪ್ ದೃಢೀಕರಿಸಿ (2/2)",
    "go_back_to_categories": "ವರ್ಗಗಳಿಗೆ ಹಿಂತಿರುಗಿ",

    // Edit Profile
    "edit_profile": "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
    "update_details": "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ನವೀಕರಿಸಿ.",
    "save_changes": "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ",
    "delete_account": "ಖಾತೆ ಅಳಿಸಿ",

    // Saved Address
    "saved_address": "ಉಳಿಸಿದ ವಿಳಾಸ",
    "manage_locations": "ನಿಮ್ಮ ಪಿಕಪ್ ಸ್ಥಳಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
    "default_address": "ಡೀಫಾಲ್ಟ್ ವಿಳಾಸ (ಪ್ರಸ್ತುತ)",
    "default_address_current": "ಡೀಫಾಲ್ಟ್ ವಿಳಾಸ (ಪ್ರಸ್ತುತ)",
    "add_new_address": "ಹೊಸ ವಿಳಾಸ ಸೇರಿಸಿ",

    "go_back_dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    "go_back_to_dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",

    // Add New Address
    "add_new_address_title": "ಹೊಸ ವಿಳಾಸ ಸೇರಿಸಿ",
    "enter_details": "ನಿಮ್ಮ ಹೊಸ ಪಿಕಪ್ ಸ್ಥಳಕ್ಕೆ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.",
    "address_name": "ಹೆಸರು (ಉದಾ., ಮನೆ, ಕಛೇರಿ)",
    "address_placeholder": "ಈ ವಿಳಾಸಕ್ಕೆ ಸ್ನೇಹಪರ ಹೆಸರು ನಮೂದಿಸಿ",
    "address_line_1": "ವಿಳಾಸ ಸಾಲು 1 (ಫ್ಲಾಟ್/ಮನೆ ಸಂಖ್ಯೆ, ಕಟ್ಟಡದ ಹೆಸರು)",
    "address_line_1_placeholder": "ಫ್ಲಾಟ್ 101, ಗ್ರೀನ್ ಅಪಾರ್ಟ್‌ಮೆಂಟ್‌ಗಳು",
    "address_line_2": "ವಿಳಾಸ ಸಾಲು 2 (ರಸ್ತೆ, ಪ್ರದೇಶ)",
    "address_line_2_placeholder": "ಬ್ರಿಗೇಡ್ ರೋಡ್, ಅಶೋಕ್ ನಗರ",
    "pincode": "ಪಿನ್‌ಕೋಡ್ / ಜಿಪ್‌ಕೋಡ್",
    "pincode_placeholder": "560001",
    "city_placeholder": "ಬೆಂಗಳೂರು",
    "state_placeholder": "ಕರ್ನಾಟಕ",
    "set_default": "ಡೀಫಾಲ್ಟ್ ಪಿಕಪ್ ವಿಳಾಸವಾಗಿ ಹೊಂದಿಸಿ",
    "save_address": "ವಿಳಾಸ ಉಳಿಸಿ",

    // Navigation
    "home": "ಮನೆ",
    "sell_waste": "ಸ್ಕ್ರ್ಯಾಪ್ ಮಾರಾಟ",
    "orders": "ಆದೇಶಗಳು",

    // Menu
    "change_language": "ಭಾಷೆ ಬದಲಾಯಿಸಿ",
    "edit_profile": "ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ",
    "saved_address": "ಉಳಿಸಿದ ವಿಳಾಸ",
    "logout": "ಲಾಗ್‌ಔಟ್",

    // Messages/Alerts
    "profile_updated": "ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!",
    "address_saved": "ವಿಳಾಸ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!",
    "pickup_submitted": "ಪಿಕಪ್ ವಿನಂತಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!",
    "select_waste": "ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ಒಂದು ತ್ಯಾಜ್ಯ ಪ್ರಕಾರ ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಪ್ರಮಾಣ ನಮೂದಿಸಿ",
    "enter_address": "ದಯವಿಟ್ಟು ಪಿಕಪ್ ವಿಳಾಸ ನಮೂದಿಸಿ",
    "fill_fields": "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ತುಂಬಿಸಿ",
    "missing_otp_mobile": "OTP ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಕಾಣೆಯಾಗಿದೆ",
    "otp_verification_failed": "OTP ಪರಿಶೀಲನೆ ವಿಫಲವಾಗಿದೆ",
    "failed_send_otp": "OTP ಕಳುಹಿಸಲು ವಿಫಲವಾಗಿದೆ",
    "failed_update_profile": "ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಲು ವಿಫಲವಾಗಿದೆ",
    "failed_update_location": "ಸ್ಥಳ ನವೀಕರಿಸಲು ವಿಫಲವಾಗಿದೆ",
    "otp_expired": "OTP ಅವಧಿ ಮುಗಿದಿದೆ",
    "invalid_otp": "ಅಮಾನ್ಯ OTP",
    "no_otp_found": "ಈ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಯಾವುದೇ OTP ಕಂಡುಬಂದಿಲ್ಲ",
    "gmail_required": "ದಯವಿಟ್ಟು ಮಾನ್ಯ ಗೂಗಲ್ ಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ (ಉದಾ., yourname@gmail.com)",
    "settings_title": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "settings_subtitle": "ನಿಮ್ಮ ಖಾತೆಯ ಆದ್ಯತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    "language_setting": "ಭಾಷೆ",
    "change": "ಬದಲಾಯಿಸಿ",
    "notifications_setting": "ಅಧಿಸೂಚನೆಗಳು",
    "profile_setting": "ಪ್ರೊಫೈಲ್",
    "location_setting": "ಸ್ಥಳ",
    "privacy_setting": "ಗೌಪ್ಯತೆ",
    "help_support": "ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ",
    "about_app": "ಇಕೋವೆರಾ ಬಗ್ಗೆ",
    "close": "ಮುಚ್ಚಿ",
    "manage": "ನಿರ್ವಹಿಸಿ",
    "view": "ವೀಕ್ಷಿಸಿ",
    "pincode": "ಪಿನ್‌ಕೋಡ್ / ಜಿಪ್‌ಕೋಡ್",

    // Recycler Setup
    "recycler_setup": "ಮರುಬಳಕೆ ಸಿದ್ಧತೆ",
    "business_name": "ವ್ಯಾಪಾರದ ಹೆಸರು",
    "enter_business_name": "ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಹೆಸರು ನಮೂದಿಸಿ",
    "business_type": "ವ್ಯಾಪಾರದ ಪ್ರಕಾರ",
    "select_business_type": "ವ್ಯಾಪಾರದ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    "recycling_plant": "ಮರುಬಳಕೆ ಸ್ಥಾವರ",
    "collection_center": "ಸಂಗ್ರಹ ಕೇಂದ್ರ",
    "scrap_dealer": "ಸ್ಕ್ರ್ಯಾಪ್ ಡೀಲರ್",
    "other": "ಇತರೆ",
    "mobile": "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    "enter_mobile": "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    "continue_to_home": "ಮನೆಗೆ ಮುಂದುವರಿಸಿ"
  },

  hi: {
    // Common/Shared
    "app_name": "इकोवेरा",
    "app_subtitle": "रीसाइकल करें। कमाएं। ग्रह को बचाएं।",
    "continue": "जारी रखें",
    "submit": "सबमिट करें",
    "save": "सेव करें",
    "cancel": "कैंसल करें",
    "back": "वापस",
    "edit": "एडिट करें",
    "edit_address": "पता संपादित करें",
    "delete": "डिलीट करें",
    "yes": "हाँ",
    "no": "नहीं",
    "ok": "ठीक है",
    "loading": "लोड हो रहा है...",
    "error": "त्रुटि",
    "success": "सफलता",

    // Login Page
    "login_title": "शुरू करने के लिए लॉगिन करें",
    "login_subtitle": "जारी रखने के लिए अपना मोबाइल नंबर दर्ज करें",
    "mobile_number": "मोबाइल नंबर",
    "otp_helper": "OTP आपके मोबाइल नंबर पर भेजा जाएगा",
    "enter_valid_mobile": "कृपया मान्य 10-12 अंकों का मोबाइल नंबर दर्ज करें",

    // OTP Page
    "otp_title": "OTP सत्यापन",
    "otp_subtitle": "अपने मोबाइल पर भेजे गए 6-अंकों का कोड दर्ज करें",
    "enter_otp": "OTP दर्ज करें",
    "otp_placeholder": "OTP दर्ज करें",
    "resend": "पुनः भेजें",
    "otp_helper_dev": "यदि यह डेमो है, तो सिमुलेटेड OTP के लिए कंसोल चेक करें।",
    "dev_otp": "डेव OTP",

    // Role Page
    "choose_role_title": "अपनी भूमिका चुनें",
    "choose_role_subtitle": "चुनें कि आप Ecovera का उपयोग कैसे करना चाहते हैं",
    "seller_role": "विक्रेता",
    "buyer_role": "खरीदार",

    // Profile Page
    "profile_title": "अपनी प्रोफ़ाइल पूरी करें",
    "profile_subtitle": "हमारे बारे में थोड़ा बताएं",
    "full_name": "पूरा नाम",
    "email": "ईमेल पता",
    "enter_name": "अपना पूरा नाम दर्ज करें",
    "enter_email": "अपना ईमेल पता दर्ज करें",

    // Location Page
    "location_title": "अपना स्थान जोड़ें",
    "location_subtitle": "पिकअप सेवाओं के लिए हमें आपका पता लगाने में मदद करें",
    "pin_code": "पिन कोड",
    "state": "राज्य",
    "city": "शहर",
    "landmark": "लैंडमार्क (वैकल्पिक)",
    "house_no": "घर संख्या/बिल्डिंग का नाम",
    "village_building_number": "गाँव/बिल्डिंग संख्या",
    "enter_village_building": "गाँव/बिल्डिंग संख्या दर्ज करें",
    "enter_pin": "6-अंकों का पिन कोड दर्ज करें",
    "enter_state": "अपना राज्य दर्ज करें",
    "enter_city": "अपना शहर दर्ज करें",
    "enter_landmark": "नजदीकी लैंडमार्क दर्ज करें",
    "enter_house": "घर/बिल्डिंग का विवरण दर्ज करें",
    "detect_my_location": "मेरा स्थान पता करें",
    "detecting_location": "पता कर रहा है...",

    // Language Page
    "language_title": "अपनी भाषा चुनें",
    "language_subtitle": "नीचे दिए गए विकल्पों से अपनी पसंदीदा भाषा चुनें",
    "english": "English",
    "english_native": "डिफ़ॉल्ट भाषा",
    "kannada": "ಕನ್ನಡ",
    "kannada_native": "कन्नड़",
    "hindi": "हिन्दी",
    "hindi_native": "हिंदी",

    // Home/Dashboard
    "greeting_morning": "सुप्रभात",
    "greeting_afternoon": "शुभ दोपहर",
    "greeting_evening": "शुभ संध्या",
    "your_location": "आपका स्थान",
    "location_format": "{city}, {state} - {pin}",
    "earned_so_far": "अब तक कमाया",
    "waste": "कचरा",
    "pickups": "पिकअप",
    "trees_saved": "बचे हुए पेड़",
    "environmental_impact": "आपका पर्यावरणीय प्रभाव",
    "impact_description": "रीसाइकिल कचरे और बचे पेड़ों के लिए बार ग्राफ + पाई चार्ट दिखाएं।",
    "view_impact": "प्रभाव देखें",

    // Sell Scrap
    "sell_scrap": "स्क्रैप बेचें",
    "search_waste": "कचरे के प्रकार खोजें",
    "categories_prices": "श्रेणियाँ और कीमतें",
    "paper": "कागज",
    "paper_desc": "कार्डबोर्ड, किताबें...",
    "metal": "धातु",
    "metal_desc": "लोहा, तांबा, स्टील...",
    "plastic": "प्लास्टिक",
    "plastic_desc": "बोतलें, डेयरी पैकेट...",
    "glass": "ग्लास",
    "glass_desc": "ग्लास बोतलें...",
    "quick_upload": "त्वरित अपलोड",
    "quick_upload_desc": "अभी अपलोड करने की आवश्यकता है? सीधे 2-चरणीय कचरा अपलोड पर जाएं।",

    // Sell Details
    "category_details": "श्रेणी विवरण",
    "detailed_pricing": "चयनित कचरे के प्रकारों के लिए विस्तृत मूल्य निर्धारण जांचें।",
    "search_specific": "एक विशिष्ट प्रकार खोजें (जैसे, अखबार)",
    "paper_pricing": "कागज मूल्य निर्धारण",
    "metal_pricing": "धातु मूल्य निर्धारण",
    "plastic_pricing": "प्लास्टिक मूल्य निर्धारण",
    "glass_pricing": "ग्लास मूल्य निर्धारण",
    "cardboard": "कार्डबोर्ड",
    "newspaper": "अखबार",
    "books": "किताबें",
    "mixed_paper": "मिश्रित कागज",
    "magazines": "पत्रिकाएँ",
    "iron": "लोहा",
    "copper": "तांबा",
    "steel": "स्टील",
    "mixed_plastics": "मिश्रित प्लास्टिक",
    "plastic_bottles": "प्लास्टिक बोतलें (PET)",
    "dairy_packets": "डेयरी पैकेट (LDPE)",
    "glass_bottles": "ग्लास बोतलें",
    "quantity_kg": "मात्रा (किग्रा):",
    "estimated_price": "अनुमानित मूल्य",

    // Orders
    "waste_collection_orders": "कचरा संग्रह आदेश",
    "view_orders": "सभी कचरा संग्रह अनुरोध देखें",
    "all_orders": "सभी आदेश",
    "pending_pickup": "पिकअप लंबित",
    "completed": "पूर्ण",
    "today": "आज, {date}",
    "yesterday": "कल, {date}",
    "paper_waste_collection": "कागज कचरा संग्रह",
    "mixed_waste_collection": "मिश्रित कचरा संग्रह",
    "view_details": "विवरण देखें",
    "no_orders": "कोई कचरा संग्रह आदेश नहीं मिला। नया आदेश बनाने के लिए \"कचरा बेचें\" पर क्लिक करें।",

    // Upload Waste
    "upload_waste_1": "कचरा अपलोड करें (1/2)",
    "upload_desc_1": "छवि अपलोड करें और अनुमानित मात्रा दर्ज करें।",
    "waste_type": "कचरा प्रकार",
    "estimated_quantity": "अनुमानित मात्रा (किग्रा)",
    "estimated_quantity_kg": "अनुमानित मात्रा (किग्रा)",
    "quantity_placeholder": "जैसे, 5.5 किग्रा",
    "upload_image": "छवि अपलोड करें",
    "upload_waste_2": "पिकअप की पुष्टि करें (2/2)",
    "confirm_desc": "अपना पता पुष्टि करें और अनुरोध सबमिट करें।",
    "pickup_address": "पिकअप पता",
    "change_address": "पता बदलें",
    "submit_pickup": "पिकअप अनुरोध सबमिट करें",
    "confirm_pickup_2": "पिकअप की पुष्टि करें (2/2)",
    "go_back_to_categories": "श्रेणियों पर वापस जाएं",
    "submit_pickup_request": "पिकअप अनुरोध सबमिट करें",
    // Edit Profile
    "edit_profile": "प्रोफ़ाइल संपादित करें",
    "update_details": "अपनी व्यक्तिगत जानकारी अपडेट करें।",
    "save_changes": "परिवर्तन सेव करें",
    "delete_account": "खाता डिलीट करें",

    // Saved Address
    "saved_address": "सेव किया गया पता",
    "manage_locations": "अपने पिकअप स्थानों का प्रबंधन करें।",
    "default_address": "डिफ़ॉल्ट पता (वर्तमान)",
    "default_address_current": "डिफ़ॉल्ट पता (वर्तमान)",
    "add_new_address": "नया पता जोड़ें",

    "go_back_dashboard": "डैशबोर्ड पर वापस जाएं",
    "go_back_to_dashboard": "डैशबोर्ड पर वापस जाएं",

    // Add New Address
    "add_new_address_title": "नया पता जोड़ें",
    "enter_details": "अपने नए पिकअप स्थान के लिए विवरण दर्ज करें।",
    "address_name": "नाम (जैसे, घर, कार्यालय)",
    "address_placeholder": "इस पते के लिए एक अनुकूल नाम दर्ज करें",
    "address_line_1": "पता पंक्ति 1 (फ्लैट/घर संख्या, बिल्डिंग का नाम)",
    "address_line_1_placeholder": "फ्लैट 101, ग्रीन अपार्टमेंट",
    "address_line_2": "पता पंक्ति 2 (सड़क, इलाका)",
    "address_line_2_placeholder": "ब्रिगेड रोड, अशोक नगर",
    "pincode": "पिनकोड / ज़िपकोड",
    "pincode_placeholder": "560001",
    "city_placeholder": "बेंगलुरु",
    "state_placeholder": "कर्नाटक",
    "set_default": "डिफ़ॉल्ट पिकअप पता के रूप में सेट करें",
    "save_address": "पता सेव करें",

    // Navigation
    "home": "होम",
    "sell_waste": "स्क्रैप बेचें",
    "orders": "आदेश",

    // Menu
    "change_language": "भाषा बदलें",
    "edit_profile": "प्रोफ़ाइल संपादित करें",
    "saved_address": "सेव किया गया पता",
    "logout": "लॉगआउट",

    // Messages/Alerts
    "profile_updated": "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!",
    "address_saved": "पता सफलतापूर्वक सेव किया गया!",
    "pickup_submitted": "पिकअप अनुरोध सफलतापूर्वक सबमिट किया गया!",
    "select_waste": "कृपया कम से कम एक कचरे का प्रकार चुनें और मात्रा दर्ज करें",
    "enter_address": "कृपया पिकअप पता दर्ज करें",
    "fill_fields": "कृपया सभी फ़ील्ड भरें",
    "missing_otp_mobile": "OTP या मोबाइल नंबर गायब है",
    "otp_verification_failed": "OTP सत्यापन विफल",
    "failed_send_otp": "OTP भेजने में विफल",
    "failed_update_profile": "प्रोफ़ाइल अपडेट करने में विफल",
    "failed_update_location": "स्थान अपडेट करने में विफल",
    "otp_expired": "OTP की अवधि समाप्त हो गई है",
    "invalid_otp": "अमान्य OTP",
    "no_otp_found": "इस मोबाइल नंबर के लिए कोई OTP नहीं मिला",
    "settings_title": "सेटिंग्स",
    "settings_subtitle": "अपनी खाता प्राथमिकताओं का प्रबंधन करें",
    "language_setting": "भाषा",
    "change": "बदलें",
    "notifications_setting": "सूचनाएं",
    "profile_setting": "प्रोफ़ाइल",
    "location_setting": "स्थान",
    "privacy_setting": "गोपनीयता",
    "help_support": "सहायता और समर्थन",
    "about_app": "इकोवेरा के बारे में",
    "close": "बंद करें",
    "manage": "प्रबंधित करें",
    "view": "देखें",
    "version": "संस्करण",
    "privacy_desc": "अपनी डेटा साझा करने की प्राथमिकताओं को नियंत्रित करें",
    "help_desc": "सहायता प्राप्त करें और समर्थन से संपर्क करें",
    "about_desc": "संस्करण 1.0.0",
    "failed_send_otp_prefix": "OTP भेजने में विफल: ",
    "server_verification_failed_prefix": "सर्वर सत्यापन विफल: ",
    "failed_verify_otp_prefix": "OTP सत्यापित करने में विफल: ",
    "failed_verify_otp": "OTP सत्यापित करने में विफल। कृपया पुनः प्रयास करें।",
    "otp_resent_success": "OTP सफलतापूर्वक पुनः भेजा गया!",
    "failed_resend_otp_prefix": "OTP पुनः भेजने में विफल: ",
    "failed_resend_otp": "OTP पुनः भेजने में विफल। कृपया पुनः प्रयास करें।",
    "fill_all_required_fields": "कृपया सभी आवश्यक फ़ील्ड भरें",
    "error_saving_location": "स्थान सहेजने में त्रुटि। कृपया पुनः प्रयास करें।",
    "failed_save_profile": "प्रोफ़ाइल सहेजने में विफल। कृपया पुनः प्रयास करें।",
    "user_not_authenticated": "उपयोगकर्ता प्रमाणित नहीं है",
    "failed_save_order_prefix": "आदेश सहेजने में विफल: ",
    "account_deletion_not_implemented": "खाता हटाना अभी तक लागू नहीं किया गया है।",
    "failed_save_address": "पता सहेजने में विफल। कृपया पुनः प्रयास करें।",
    "gmail_required": "कृपया मान्य Gmail पता दर्ज करें (जैसे, yourname@gmail.com)",
    // Recycler Setup
    "recycler_setup": "रीसाइक्लर सेटअप",
    "business_name": "व्यापार नाम",
    "enter_business_name": "अपना व्यापार नाम दर्ज करें",
    "business_type": "व्यापार प्रकार",
    "select_business_type": "व्यापार प्रकार चुनें",
    "recycling_plant": "रीसाइक्लिंग प्लांट",
    "collection_center": "संग्रह केंद्र",
    "scrap_dealer": "स्क्रैप डीलर",
    "other": "अन्य",
    "enter_mobile": "मोबाइल नंबर दर्ज करें",
    "continue_to_home": "होम पर जारी रखें"
  }
};

// Translation function
function translate(key, lang = null) {
  if (!lang) {
    lang = localStorage.getItem('selectedLanguage') || 'en';
  }
  return translations[lang] && translations[lang][key] ? translations[lang][key] : translations['en'][key] || key;
}

// Apply translations to elements with data-translate attribute
function applyTranslations(lang = null) {
  if (!lang) {
    lang = localStorage.getItem('selectedLanguage') || 'en';
  }

  // Store selected language
  localStorage.setItem('selectedLanguage', lang);

  // Update all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const translation = translate(key, lang);

    // Handle placeholders for inputs
    if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
      element.placeholder = translation;
    }
    // Handle text content for other elements
    else {
      element.textContent = translation;
    }
  });

  // Update select options with data-translate attribute
  document.querySelectorAll('option[data-translate]').forEach(option => {
    const key = option.getAttribute('data-translate');
    const translation = translate(key, lang);
    option.textContent = translation;
  });

  // Update page title if it has a translation
  const titleKey = document.body.getAttribute('data-page-title');
  if (titleKey) {
    document.title = translate(titleKey, lang);
  }
}

// Initialize translations on page load
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
});
    
