# Servidor estático mínimo para revisar el sitio en local (Windows PowerShell 5.1, sin dependencias).
# Uso:  powershell -ExecutionPolicy Bypass -File scripts\servidor-dev.ps1 [-Puerto 8090]
# Sirve la carpeta raíz del proyecto en http://localhost:<puerto>/ . Ctrl+C para cortar.
param([int]$Puerto = 8090)

$raiz = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$tipos = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".js"="application/javascript; charset=utf-8";
  ".json"="application/json; charset=utf-8"; ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg";
  ".svg"="image/svg+xml"; ".ico"="image/x-icon"; ".pdf"="application/pdf"; ".csv"="text/csv; charset=utf-8"; ".txt"="text/plain; charset=utf-8"
}
$oyente = New-Object System.Net.HttpListener
$oyente.Prefixes.Add("http://localhost:$Puerto/")
$oyente.Start()
Write-Host "Sirviendo $raiz en http://localhost:$Puerto/  (Ctrl+C para cortar)"
try {
  while ($oyente.IsListening) {
    $ctx = $oyente.GetContext()
    $ruta = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    if ($ruta.EndsWith("/")) { $ruta += "index.html" }
    $archivo = Join-Path $raiz ($ruta.TrimStart("/") -replace "/", "\")
    $completo = [IO.Path]::GetFullPath($archivo)
    if ($completo.StartsWith($raiz) -and (Test-Path $completo -PathType Leaf)) {
      $bytes = [IO.File]::ReadAllBytes($completo)
      $ext = [IO.Path]::GetExtension($completo).ToLower()
      $ctx.Response.ContentType = if ($tipos.ContainsKey($ext)) { $tipos[$ext] } else { "application/octet-stream" }
      $ctx.Response.Headers.Add("Cache-Control", "no-store")
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
      $msg = [Text.Encoding]::UTF8.GetBytes("404 - no existe $ruta")
      $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $ctx.Response.Close()
  }
} finally { $oyente.Stop() }
