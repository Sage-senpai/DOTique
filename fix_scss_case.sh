#!/bin/bash

# Script to fix SCSS import case sensitivity issues for Linux/Vercel deployment
# Run this in your project root directory

echo "🔍 Finding all SCSS files and their actual names..."

# Create a temporary file to store actual filenames
temp_file=$(mktemp)

# Find all .scss files and store their paths
find src -name "*.scss" > "$temp_file"

echo "📝 Found SCSS files:"
cat "$temp_file"
echo ""

echo "🔧 Fixing imports in TypeScript/React files..."

# Function to fix imports in a file
fix_imports() {
    local file=$1
    
    # Read all imports from the file
    imports=$(grep -o "import.*\.scss['\"]" "$file" 2>/dev/null || echo "")
    
    if [ -z "$imports" ]; then
        return
    fi
    
    echo "  Checking: $file"
    
    # Process each import line
    while IFS= read -r line; do
        if [ -z "$line" ]; then
            continue
        fi
        
        # Extract the imported path
        imported_path=$(echo "$line" | sed -n "s/.*['\"]\\(.*\\.scss\\)['\"].*/\\1/p")
        
        if [ -z "$imported_path" ]; then
            continue
        fi
        
        # Get the directory of the importing file
        file_dir=$(dirname "$file")
        
        # Resolve the full path of the imported file
        if [[ "$imported_path" == ./* ]] || [[ "$imported_path" == ../* ]]; then
            # Resolve relative path
            full_path=$(cd "$file_dir" && realpath -m "$imported_path" 2>/dev/null)
            
            # Check if the file exists (case-insensitive search)
            if [ ! -f "$full_path" ]; then
                # Try to find the file with different case
                dir_path=$(dirname "$full_path")
                base_name=$(basename "$full_path")
                
                # Find actual file (case-insensitive)
                actual_file=$(find "$dir_path" -iname "$base_name" -type f 2>/dev/null | head -1)
                
                if [ -n "$actual_file" ]; then
                    actual_basename=$(basename "$actual_file")
                    
                    if [ "$base_name" != "$actual_basename" ]; then
                        echo "    ❌ Wrong case: $imported_path"
                        echo "    ✅ Should be:  ${imported_path%/*}/$actual_basename"
                        
                        # Fix the import in the file
                        correct_path="${imported_path%/*}/$actual_basename"
                        sed -i "s|$imported_path|$correct_path|g" "$file"
                        echo "    🔧 Fixed!"
                    fi
                else
                    echo "    ⚠️  File not found: $imported_path"
                fi
            fi
        fi
    done <<< "$imports"
}

# Find all TypeScript and TSX files and fix their imports
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
    fix_imports "$file"
done

echo ""
echo "✅ All SCSS import cases have been checked and fixed!"
echo ""
echo "🚀 Next steps:"
echo "   1. Review the changes: git diff"
echo "   2. Test the build: pnpm build"
echo "   3. Commit changes: git add . && git commit -m 'fix: correct SCSS import case sensitivity'"
echo "   4. Push to deploy: git push origin main"

# Clean up
rm "$temp_file"