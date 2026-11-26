<?php
require 'db.php';
echo "Connected to SafeSteps successfully! ✅<br><br>";
$stmt = $pdo->query("SELECT * FROM reports");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo "Total reports: " . count($rows) . "<br>";
foreach ($rows as $r) {
    echo $r['reference_number'] . " - " . $r['location'] . " - " . $r['status'] . "<br>";
}
?>