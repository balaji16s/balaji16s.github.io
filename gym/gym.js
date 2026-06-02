        /* ---------- Workout data ---------- */
        function e(n, c, g, s, r, t, i) { return { n: n, c: c, g: g, s: s, r: r, t: t, i: i }; }

        // Phase 1 — dumbbell Upper/Lower template
        var lowerA_db = { short: 'Lower A', title: 'Lower Body A', focus: 'Quads, glutes, hamstrings, core. Counteracts all that sitting.', ex: [
            e('Goblet Squat', 'Hold a dumbbell at your chest, squat down keeping chest up.', 'goblet-squat.gif', '3', '10–12', '90s', 'Moderate'),
            e('Romanian Deadlift (DB)', 'Push hips back, slight knee bend, feel the hamstring stretch.', 'romanian-deadlift.gif', '3', '10–12', '90s', 'Moderate'),
            e('Leg Press', 'Feet shoulder-width. Don\'t lock the knees at the top.', 'leg-press.gif', '3', '12–15', '75s', 'Moderate'),
            e('Seated Leg Curl', 'Targets hamstrings. Slow on the way back.', 'lying-leg-curl.gif', '3', '12–15', '60s', 'Moderate'),
            e('Standing Calf Raise', 'Full stretch at the bottom, pause at the top.', 'standing-calf-raise.gif', '3', '15–20', '45s', 'Light–Mod'),
            e('Plank', 'Brace abs, straight line. Don\'t let hips sag.', 'plank.gif', '3', '30–45s', '45s', 'Bodyweight')
        ]};
        var upperA_db = { short: 'Upper A', title: 'Upper Body A', focus: 'Chest, back, shoulders, arms — pushing emphasis.', ex: [
            e('Dumbbell Bench Press', 'Lower to chest, press up. Keep elbows ~45°.', 'db-bench-press.gif', '3', '8–12', '90s', 'Moderate'),
            e('Lat Pulldown', 'Pull bar to upper chest, squeeze the back.', 'lat-pulldown.gif', '3', '10–12', '90s', 'Moderate'),
            e('Seated DB Shoulder Press', 'Press overhead, don\'t arch the lower back.', 'seated-shoulder-press.gif', '3', '10–12', '75s', 'Moderate'),
            e('Seated Cable Row', 'Drive elbows back, chest tall. Great for posture.', 'seated-cable-row.gif', '3', '10–12', '75s', 'Moderate'),
            e('DB Bicep Curl', 'No swinging. Full range.', 'db-bicep-curl.gif', '2', '12–15', '60s', 'Light–Mod'),
            e('Tricep Pushdown', 'Elbows pinned at the sides.', 'tricep-pushdown.gif', '2', '12–15', '60s', 'Light–Mod')
        ]};
        // Phase 2 — same template, barbell swaps on the big lifts
        var lowerA_bb = { short: 'Lower A', title: 'Lower Body A', focus: 'Quads, glutes, hamstrings, core. Barbell strength focus.', ex: [
            e('Barbell Back Squat', 'Bar on upper traps, brace hard, squat to depth with control.', 'barbell-squat.gif', '3', '6–8', '120s', 'Mod–Hard'),
            e('Barbell Deadlift', 'Flat back, push the floor away, lock out tall.', 'barbell-deadlift.gif', '3', '5–6', '120s', 'Mod–Hard'),
            e('Leg Press', 'Feet shoulder-width. Don\'t lock the knees at the top.', 'leg-press.gif', '3', '12–15', '75s', 'Moderate'),
            e('Seated Leg Curl', 'Targets hamstrings. Slow on the way back.', 'lying-leg-curl.gif', '3', '12–15', '60s', 'Moderate'),
            e('Standing Calf Raise', 'Full stretch at the bottom, pause at the top.', 'standing-calf-raise.gif', '3', '15–20', '45s', 'Light–Mod'),
            e('Plank', 'Brace abs, straight line. Don\'t let hips sag.', 'plank.gif', '3', '30–45s', '45s', 'Bodyweight')
        ]};
        var upperA_bb = { short: 'Upper A', title: 'Upper Body A', focus: 'Chest, back, shoulders, arms — barbell pressing strength.', ex: [
            e('Barbell Bench Press', 'Lower to chest under control, drive up. Keep elbows ~45°.', 'barbell-bench-press.gif', '3', '6–8', '90s', 'Mod–Hard'),
            e('Lat Pulldown', 'Pull bar to upper chest, squeeze the back.', 'lat-pulldown.gif', '3', '10–12', '90s', 'Moderate'),
            e('Seated DB Shoulder Press', 'Press overhead, don\'t arch the lower back.', 'seated-shoulder-press.gif', '3', '10–12', '75s', 'Moderate'),
            e('Seated Cable Row', 'Drive elbows back, chest tall. Great for posture.', 'seated-cable-row.gif', '3', '10–12', '75s', 'Moderate'),
            e('DB Bicep Curl', 'No swinging. Full range.', 'db-bicep-curl.gif', '2', '12–15', '60s', 'Light–Mod'),
            e('Tricep Pushdown', 'Elbows pinned at the sides.', 'tricep-pushdown.gif', '2', '12–15', '60s', 'Light–Mod')
        ]};
        // Friday / Saturday — same across Phase 1 & 2
        var lowerB = { short: 'Lower B', title: 'Lower Body B', focus: 'Lower body again — different emphasis and exercises.', ex: [
            e('Leg Press (heavier)', 'Primary strength movement today.', 'leg-press.gif', '4', '8–10', '120s', 'Mod–Hard'),
            e('Dumbbell Walking Lunge', 'Step forward, knee tracks over toes. Balance + glutes.', 'walking-lunge.gif', '3', '10 / leg', '90s', 'Moderate'),
            e('Hip Thrust (machine or DB)', 'Squeeze glutes hard at the top. Crucial for desk-flattened glutes.', 'hip-thrust.gif', '3', '12–15', '75s', 'Moderate'),
            e('Leg Extension', 'Quad isolation. Controlled, no swinging.', 'leg-extension.gif', '3', '12–15', '60s', 'Moderate'),
            e('Seated Calf Raise', 'Slow, full range. Pause at the top.', 'seated-calf-raise.gif', '3', '15–20', '45s', 'Light–Mod'),
            e('Cable Crunch / Hanging Knee Raise', 'Controlled core work — no swinging or momentum.', 'hanging-knee-raise.gif', '3', '12–15', '45s', 'Moderate')
        ]};
        var upperB = { short: 'Upper B', title: 'Upper Body B', focus: 'Upper body again — pulling emphasis + posture work.', ex: [
            e('Incline DB Press', 'Targets upper chest — fills out the chest sag.', 'incline-db-press.gif', '3', '10–12', '90s', 'Moderate'),
            e('Assisted Pull-up / Lat Pulldown', 'Use the assist machine. Builds toward your first real pull-up.', 'assisted-pull-up.gif', '3', '6–10', '90s', 'Moderate'),
            e('Single-Arm DB Row', 'Knee on bench, pull dumbbell to hip. Full stretch.', 'single-arm-row.gif', '3', '10–12', '75s', 'Moderate'),
            e('Lateral Raise', 'Light, strict. Builds shoulder width.', 'lateral-raise.gif', '3', '12–15', '60s', 'Light'),
            e('Face Pull (Cable)', 'Pull rope to face, elbows high. Fixes rounded "desk shoulders."', 'face-pull.gif', '3', '15–20', '60s', 'Light'),
            e('Hammer Curl', 'Neutral grip, no swinging. Full range.', 'hammer-curl.gif', '2', '12–15', '60s', 'Light–Mod')
        ]};
        // Phase 3/4 — Push / Pull / Legs / Upper
        var push = { short: 'Push', title: 'Push', focus: 'Chest, shoulders, triceps — pressing day.', ex: [
            e('Barbell Bench Press', 'Main pressing lift. Lower to chest, drive up.', 'barbell-bench-press.gif', '4', '6–8', '120s', 'Mod–Hard'),
            e('Incline DB Press', 'Upper-chest focus.', 'incline-db-press.gif', '3', '8–12', '90s', 'Moderate'),
            e('Seated DB Shoulder Press', 'Press overhead, ribs down.', 'seated-shoulder-press.gif', '3', '8–12', '90s', 'Moderate'),
            e('Lateral Raise', 'Strict and light. Builds shoulder width.', 'lateral-raise.gif', '3', '12–15', '60s', 'Light'),
            e('Overhead Tricep Extension', 'Elbows in, full stretch overhead.', 'overhead-tricep-extension.gif', '3', '10–12', '60s', 'Moderate'),
            e('Tricep Pushdown', 'Elbows pinned, squeeze at the bottom.', 'tricep-pushdown.gif', '3', '12–15', '45s', 'Light–Mod')
        ]};
        var pull = { short: 'Pull', title: 'Pull', focus: 'Back, biceps, rear delts — pulling day.', ex: [
            e('Barbell Bent-Over Row', 'Flat back, pull the bar to your lower ribs.', 'barbell-row.gif', '4', '6–8', '120s', 'Mod–Hard'),
            e('Lat Pulldown', 'Pull to upper chest, squeeze the lats.', 'lat-pulldown.gif', '3', '10–12', '90s', 'Moderate'),
            e('Single-Arm DB Row', 'Full stretch, pull to the hip.', 'single-arm-row.gif', '3', '10–12', '75s', 'Moderate'),
            e('Face Pull (Cable)', 'Elbows high — fixes desk posture.', 'face-pull.gif', '3', '15–20', '60s', 'Light'),
            e('DB Bicep Curl', 'No swing, full range.', 'db-bicep-curl.gif', '3', '10–12', '60s', 'Moderate'),
            e('Hammer Curl', 'Neutral grip, controlled.', 'hammer-curl.gif', '3', '12–15', '60s', 'Light–Mod')
        ]};
        var legs = { short: 'Legs', title: 'Legs', focus: 'Quads, hamstrings, glutes, calves — full lower body.', ex: [
            e('Barbell Back Squat', 'Main leg lift. Brace and hit depth.', 'barbell-squat.gif', '4', '6–8', '120s', 'Mod–Hard'),
            e('Romanian / Barbell Deadlift', 'Hip hinge, hamstring stretch, flat back.', 'barbell-deadlift.gif', '3', '6–8', '120s', 'Mod–Hard'),
            e('Leg Press', 'Higher reps for volume.', 'leg-press.gif', '3', '10–12', '90s', 'Moderate'),
            e('Leg Extension', 'Quad isolation, controlled.', 'leg-extension.gif', '3', '12–15', '60s', 'Moderate'),
            e('Lying Leg Curl', 'Hamstring isolation.', 'lying-leg-curl.gif', '3', '12–15', '60s', 'Moderate'),
            e('Seated Calf Raise', 'Full range, pause at the top.', 'seated-calf-raise.gif', '4', '15–20', '45s', 'Light–Mod')
        ]};
        var upper = { short: 'Upper', title: 'Upper', focus: 'Balanced push & pull — extra volume and weak points.', ex: [
            e('Incline DB Press', 'Upper chest.', 'incline-db-press.gif', '3', '8–12', '90s', 'Moderate'),
            e('Pull-up / Assisted Pull-up', 'Use the assist as needed.', 'assisted-pull-up.gif', '3', '6–10', '90s', 'Moderate'),
            e('Seated DB Shoulder Press', 'Overhead press.', 'seated-shoulder-press.gif', '3', '10–12', '75s', 'Moderate'),
            e('Seated Cable Row', 'Mid-back + posture.', 'seated-cable-row.gif', '3', '10–12', '75s', 'Moderate'),
            e('Lateral Raise', 'Shoulder width.', 'lateral-raise.gif', '3', '12–15', '60s', 'Light'),
            e('DB Bicep Curl', 'Arms.', 'db-bicep-curl.gif', '3', '12–15', '45s', 'Light–Mod'),
            e('Tricep Pushdown', 'Arms.', 'tricep-pushdown.gif', '3', '12–15', '45s', 'Light–Mod')
        ]};

        var PLAN = {
            1: { label: '1 · Foundation', note: '<b>Foundation.</b> Run this exact template. Weeks 1–2: do only the <b>first 2 sets</b>, light — just learn the movements. Week 3+: the full sets shown.', days: { Mon: lowerA_db, Wed: upperA_db, Fri: lowerB, Sat: upperB } },
            2: { label: '2 · Early Int.', note: '<b>Early Intermediate.</b> Full 3 sets, progressive overload weekly. Squat, deadlift &amp; bench upgrade to the <b>barbell</b> version — same movement pattern, grown-up tool.', days: { Mon: lowerA_bb, Wed: upperA_bb, Fri: lowerB, Sat: upperB } },
            3: { label: '3 · Intermediate', note: '<b>Intermediate.</b> Push / Pull / Legs / Upper — higher volume (3–4 sets), more exercises. Drives muscle growth and fixes weak points.', days: { Mon: push, Wed: pull, Fri: legs, Sat: upper } },
            4: { label: '4 · Lifestyle', note: '<b>Lifestyle.</b> Same Push/Pull/Legs/Upper structure, <b>auto-regulated</b> — push hard some weeks, coast others. Maintain &amp; perform.', days: { Mon: push, Wed: pull, Fri: legs, Sat: upper } }
        };

        var DAYS = ['Mon', 'Wed', 'Fri', 'Sat'];
        var WD = { Mon: 'Monday', Wed: 'Wednesday', Fri: 'Friday', Sat: 'Saturday' };

        var state = { phase: 1, day: null };

        function todayDay() {
            var map = { 1: 'Mon', 3: 'Wed', 5: 'Fri', 6: 'Sat' };
            return map[new Date().getDay()] || null; // null on Tue/Thu/Sun (rest)
        }

        function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

        function renderPhasePills() {
            var html = '';
            [1, 2, 3, 4].forEach(function (p) {
                html += '<button class="pill" data-phase="' + p + '" aria-pressed="' + (state.phase === p) + '">' + PLAN[p].label + '</button>';
            });
            document.getElementById('phaseRow').innerHTML = html;
        }
        function renderDayPills() {
            var days = PLAN[state.phase].days;
            var html = '';
            DAYS.forEach(function (d) {
                html += '<button class="pill" data-day="' + d + '" aria-pressed="' + (state.day === d) + '">' + d + '<small>' + days[d].short + '</small></button>';
            });
            document.getElementById('dayRow').innerHTML = html;
        }
        function renderWorkout() {
            var host = document.getElementById('workout-render');
            var note = '<div class="phase-note">' + PLAN[state.phase].note + '</div>';
            if (!state.day) {
                host.innerHTML = note +
                    '<div class="card day"><div class="day-title"><span class="d">Rest day</span></div>' +
                    '<p class="day-focus" style="margin-bottom:0">No lifting scheduled today — a light 20–30 min walk plus some mobility keeps you loose. Tap a training day above to preview its session.</p></div>';
                return;
            }
            var d = PLAN[state.phase].days[state.day];
            var rows = d.ex.map(function (x) {
                return '<div class="ex">' +
                    '<a class="ex-thumb" href="img/' + x.g + '" target="_blank" rel="noopener"><img src="img/' + x.g + '" loading="lazy" alt="' + esc(x.n) + ' demonstration"></a>' +
                    '<div class="ex-body"><div class="ex-name">' + esc(x.n) + '</div>' +
                    '<div class="ex-cue">' + esc(x.c) + '</div>' +
                    '<div class="ex-meta"><span class="tag">' + x.s + ' × ' + x.r + '</span><span class="tag">' + x.t + ' rest</span><span class="tag">' + x.i + '</span></div>' +
                    '</div></div>';
            }).join('');
            host.innerHTML = note +
                '<div class="card day"><div class="day-title"><span class="d">' + WD[state.day] + '</span><span class="f">' + esc(d.title) + '</span></div>' +
                '<p class="day-focus">' + esc(d.focus) + '</p>' + rows + '</div>';
        }
        function renderAll() { renderPhasePills(); renderDayPills(); renderWorkout(); }

        document.getElementById('phaseRow').addEventListener('click', function (ev) {
            var b = ev.target.closest('[data-phase]'); if (!b) return;
            state.phase = +b.getAttribute('data-phase');
            try { localStorage.setItem('gym-phase', state.phase); } catch (e) {}
            renderAll();
        });
        document.getElementById('dayRow').addEventListener('click', function (ev) {
            var b = ev.target.closest('[data-day]'); if (!b) return;
            state.day = b.getAttribute('data-day');
            renderDayPills(); renderWorkout();
        });

        (function init() {
            var saved = parseInt(localStorage.getItem('gym-phase'), 10);
            state.phase = (saved >= 1 && saved <= 4) ? saved : 1;
            state.day = todayDay();
            renderAll();
        })();

        /* ---------- Accordion deep-linking ---------- */
        function openFromHash() {
            var id = location.hash.slice(1); if (!id) return;
            var el = document.getElementById(id);
            if (el && el.tagName === 'DETAILS') { el.open = true; el.scrollIntoView(); }
        }
        document.addEventListener('click', function (ev) {
            var a = ev.target.closest('a[href^="#"]'); if (!a) return;
            var el = document.getElementById(a.getAttribute('href').slice(1));
            if (el && el.tagName === 'DETAILS') el.open = true;
        });
        window.addEventListener('hashchange', openFromHash);
        window.addEventListener('load', openFromHash);
