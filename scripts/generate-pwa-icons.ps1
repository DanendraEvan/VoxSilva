$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

function New-TreeIcon {
    param(
        [Parameter(Mandatory = $true)][int]$Size,
        [Parameter(Mandatory = $true)][string]$OutPath
    )

    $bmp = [System.Drawing.Bitmap]::new($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.Color]::Transparent)

    $trunkBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 122, 72, 35))
    $trunkDark  = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 92, 55, 27))
    $leaf1      = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 54, 155, 74))
    $leaf2      = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 38, 120, 58))
    $leaf3      = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 88, 190, 102))
    $ground     = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 49, 105, 78))
    $ground2    = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 36, 86, 62))

    $cx = $Size / 2.0
    $baseY = $Size * 0.78

    # Ground shadow
    $g.FillEllipse($ground2, [float]($Size * 0.10), [float]($Size * 0.78), [float]($Size * 0.80), [float]($Size * 0.16))
    $g.FillEllipse($ground,  [float]($Size * 0.16), [float]($Size * 0.80), [float]($Size * 0.68), [float]($Size * 0.12))

    # Trunk
    $trunkW = $Size * 0.18
    $trunkH = $Size * 0.30
    $trunkX = $cx - ($trunkW / 2.0)
    $trunkY = $baseY - $trunkH

    $trunkRect = New-Object System.Drawing.RectangleF([float]$trunkX, [float]$trunkY, [float]$trunkW, [float]$trunkH)
    $g.FillRectangle($trunkBrush, $trunkRect)
    $g.FillRectangle($trunkDark, [float]($trunkX + $trunkW * 0.62), [float]$trunkY, [float]($trunkW * 0.38), [float]$trunkH)

    # Branches
    $branchY = $trunkY + $trunkH * 0.22
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 92, 55, 27), [float]($Size * 0.045))
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap   = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($pen, [float]$cx, [float]$branchY, [float]($cx - $Size * 0.20), [float]($branchY - $Size * 0.10))
    $g.DrawLine($pen, [float]$cx, [float]$branchY, [float]($cx + $Size * 0.20), [float]($branchY - $Size * 0.10))
    $g.DrawLine($pen, [float]$cx, [float]($branchY + $Size * 0.02), [float]($cx - $Size * 0.16), [float]($branchY - $Size * 0.03))
    $g.DrawLine($pen, [float]$cx, [float]($branchY + $Size * 0.02), [float]($cx + $Size * 0.16), [float]($branchY - $Size * 0.03))

    # Canopy clusters
    $canopyCenterY = $Size * 0.38
    $rBase = $Size * 0.18
    $clusters = @(
        @{ dx = -0.22; dy = -0.03; mul = 1.05; brush = $leaf2 },
        @{ dx =  0.22; dy = -0.03; mul = 1.05; brush = $leaf2 },
        @{ dx =  0.00; dy = -0.14; mul = 1.20; brush = $leaf1 },
        @{ dx = -0.12; dy = -0.20; mul = 1.00; brush = $leaf3 },
        @{ dx =  0.12; dy = -0.20; mul = 1.00; brush = $leaf3 },
        @{ dx = -0.28; dy =  0.12; mul = 0.98; brush = $leaf1 },
        @{ dx =  0.28; dy =  0.12; mul = 0.98; brush = $leaf1 },
        @{ dx = -0.05; dy =  0.08; mul = 1.05; brush = $leaf3 },
        @{ dx =  0.05; dy =  0.08; mul = 1.05; brush = $leaf3 }
    )
    foreach ($c in $clusters) {
        $r = $rBase * $c.mul
        $x = $cx + ($c.dx * $Size)
        $y = $canopyCenterY + ($c.dy * $Size)
        $g.FillEllipse($c.brush, [float]($x - $r), [float]($y - $r), [float]($r * 2), [float]($r * 2))
    }

    # Subtle outline
    $outline = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, 0, 0, 0), [float]($Size * 0.01))
    $g.DrawEllipse($outline, [float]($Size * 0.16), [float]($Size * 0.18), [float]($Size * 0.68), [float]($Size * 0.52))

    $dir = Split-Path -Parent $OutPath
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }

    $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)

    # Cleanup
    $outline.Dispose()
    $pen.Dispose()
    $g.Dispose()
    $bmp.Dispose()
    $trunkBrush.Dispose()
    $trunkDark.Dispose()
    $leaf1.Dispose()
    $leaf2.Dispose()
    $leaf3.Dispose()
    $ground.Dispose()
    $ground2.Dispose()
}

New-TreeIcon -Size 192 -OutPath (Join-Path $PSScriptRoot '..\\public\\icon-192x192.png')
New-TreeIcon -Size 512 -OutPath (Join-Path $PSScriptRoot '..\\public\\icon-512x512.png')

Write-Host 'OK: Generated public/icon-192x192.png and public/icon-512x512.png'


