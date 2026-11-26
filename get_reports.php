<?php
require 'db.php';
header('Content-Type: application/json');

$stmt = $pdo->query("SELECT reference_number, reporter_name, location, hazard_type, description, status, created_at FROM reports ORDER BY created_at DESC");
$reports = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Counts
$total = count($reports);
$pending = 0; $progress = 0; $resolved = 0;
foreach ($reports as $r) {
    $s = strtolower($r['status']);
    if ($s === 'pending') $pending++;
    elseif ($s === 'in progress' || $s === 'in_progress') $progress++;
    elseif ($s === 'resolved') $resolved++;
}

echo json_encode([
    'success' => true,
    'counts' => ['total' => $total, 'pending' => $pending, 'progress' => $progress, 'resolved' => $resolved],
    'reports' => $reports
]);
?>