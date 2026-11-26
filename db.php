<?php
$database_url = getenv('DATABASE_URL');

if ($database_url) {
    // ON RENDER - Neon
    $parts = parse_url($database_url);
    $host = $parts['host'];
    $port = $parts['port'] ?? 5432;
    $user = $parts['user'];
    $pass = $parts['pass'];
    $dbname = ltrim($parts['path'], '/');
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=require";
} else {
    // ON LAPTOP - localhost
    $host = 'localhost';
    $port = 5432;
    $user = 'postgres';
    $pass = 'Freeme@5057';
    $dbname = 'SafeSteps';
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
}

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>