/**
 * DevLab Microservices Integration Test
 *
 * Usage:
 *   node test-gateway.js                              # defaults to http://localhost:4000
 *   node test-gateway.js http://localhost:30121        # K8s NodePort
 *   node test-gateway.js http://192.168.49.2:30121    # Minikube IP
 */

const BASE_URL = process.argv[2] || "http://localhost:4000";
const SIMULATE_URL = `${BASE_URL}/simulate`;
const HEALTH_URL = `${BASE_URL}/health`;

let passed = 0;
let failed = 0;

async function runTest(testName, url, options = {}, expectedSuccess = true) {
    console.log(`\n--------------------------------------`);
    console.log(`🧪 ${testName}`);

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        console.log(`   Status : ${response.status}`);
        console.log(`   Body   : ${JSON.stringify(data, null, 2)}`);

        const ok =
            expectedSuccess === true
                ? response.ok && data.success !== false
                : !response.ok || data.success === false;

        if (ok) {
            console.log(`   ✅ PASSED`);
            passed++;
        } else {
            console.log(`   ❌ FAILED (unexpected success/failure state)`);
            failed++;
        }
        return data;
    } catch (error) {
        console.error(`   ❌ ERROR: ${error.message}`);
        failed++;
        return null;
    }
}

async function main() {
    console.log("╔══════════════════════════════════════════╗");
    console.log("║  DevLab – Microservices Integration Test ║");
    console.log("╚══════════════════════════════════════════╝");
    console.log(`Target: ${BASE_URL}\n`);

    // ── Health check ──────────────────────────────
    const health = await runTest(
        "Gateway Health Check",
        HEALTH_URL,
        { method: "GET" }
    );
    if (!health) {
        console.error("\n⛔ Gateway is not reachable. Aborting.");
        process.exit(1);
    }

    // ── Pull image ────────────────────────────────
    await runTest("docker pull nginx", SIMULATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: "docker pull nginx" }),
    });

    // ── List images ───────────────────────────────
    await runTest("docker images", SIMULATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: "docker images" }),
    });

    // ── Run container ─────────────────────────────
    await runTest("docker run nginx", SIMULATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: "docker run nginx" }),
    });

    // ── List running containers ───────────────────
    await runTest("docker ps", SIMULATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: "docker ps" }),
    });

    // ── List all containers ───────────────────────
    await runTest("docker ps -a", SIMULATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: "docker ps -a" }),
    });

    // ── Error: missing command body ───────────────
    await runTest("Error: empty body", SIMULATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
    }, false);

    // ── Error: invalid command ────────────────────
    await runTest("Error: invalid command", SIMULATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: "kubectl get pods" }),
    }, false);

    // ── Summary ───────────────────────────────────
    console.log("\n======================================");
    console.log(`  Results: ${passed} passed, ${failed} failed`);
    console.log("======================================");

    process.exit(failed > 0 ? 1 : 0);
}

main();
