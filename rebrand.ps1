$files = Get-ChildItem -Path 'c:\Users\HP\.gemini\antigravity\scratch\calcora\src' -Recurse -Include '*.tsx','*.ts'
foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    $changed = $false
    if ($c.Contains('Calcora')) {
        $c = $c.Replace('Calcora', 'SmartSaverCalc')
        $changed = $true
    }
    if ($c.Contains('calcora-sandy.vercel.app')) {
        $c = $c.Replace('calcora-sandy.vercel.app', 'smartsavercalc.com')
        $changed = $true
    }
    if ($c.Contains('calcora.com')) {
        $c = $c.Replace('calcora.com', 'smartsavercalc.com')
        $changed = $true
    }
    if ($changed) {
        [System.IO.File]::WriteAllText($f.FullName, $c)
        Write-Host "Updated: $($f.FullName)"
    }
}
Write-Host "Done!"
