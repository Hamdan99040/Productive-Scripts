# ============================================================
# Intelligent Rename Script - Salary folder FY year files
# ============================================================
$folderPath = "C:\Users\needm\OneDrive\Desktop\salary"

# 1. Get all xlsx files sorted by name
$files = Get-ChildItem -Path $folderPath -Filter "*.xlsx" | Sort-Object Name

if ($files.Count -eq 0) {
    Write-Host "ERROR: No .xlsx files found in the folder!" -ForegroundColor Red
    exit
}

# 2. Intelligently build the exact number of names needed
$targetNames = @()
$startYear = 2010

# Keep adding years until we match your exact file count
for ($i = 0; $targetNames.Count -lt $files.Count; $i++) {
    $currentYear = $startYear + $i
    $targetNames += "FY$currentYear Digital Hub.xlsx"
    $targetNames += "FY$currentYear US_Site.xlsx"
}

# 3. Rename each file safely without strict counts
Write-Host "Found $($files.Count) files. Starting rename process..." -ForegroundColor Cyan

for ($i = 0; $i -lt $files.Count; $i++) {
    $oldName = $files[$i].FullName
    $newName = $targetNames[$i]

    Write-Host "Renaming: $($files[$i].Name)  -->  $newName"
    Rename-Item -Path $oldName -NewName $newName
}

Write-Host "`nDone! All $($files.Count) files successfully processed." -ForegroundColor Green
