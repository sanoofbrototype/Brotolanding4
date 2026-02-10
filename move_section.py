
# Python script to move section-testimonials
file_path = r'd:/Antigravity/Brotolanding4/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Adjust to 0-based indexing
# Section Testimonials: 611 to 863 (1-based) -> 610 to 863 (slice)
start_idx = 610
end_idx = 863

# Extract content
testimonials_section = lines[start_idx:end_idx]

# Remove from original location
# Note: We must remove from larger index first if insert index was > remove index
# But here remove index > insert index, so we remove first to simplify logic?
# Actually, if we remove first, indices shift.
# But since start_idx (610) > insert_idx (422), removing the later part doesn't affect the earlier part logic.
del lines[start_idx:end_idx]

# Insert Position: Below Section Portfolio
# Section Portfolio ends at line 422. New section starts at 423.
# So insert at index 422 (0-based)
insert_idx = 422
lines[insert_idx:insert_idx] = testimonials_section

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Moved section-testimonials successfully.")
