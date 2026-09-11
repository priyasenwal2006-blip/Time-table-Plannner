const DAYS = 6;
const SLOTS = 4;

const subjects = [
  { code: "ET", name: "Ethical Hacking" },
  { code: "OS", name: "Operating Systems" },
  { code: "CN", name: "Computer Networks" },
  { code: "DSL", name: "Data Structures Lab" },
  { code: "MATH", name: "Engineering Mathematics" },
];

const teachers = [
  { id: "T01", name: "Ms. Shiwani Bhaskar" },
  { id: "T02", name: "Mrs. Meenakshi Sharma" },
  { id: "T03", name: "Dr. K.C Purohit" },
];

const rooms = [
  { id: "R101", type: "Lecture" },
  { id: "R102", type: "Lecture" },
  { id: "LAB1", type: "Lab" },
];

const batches = [
  { id: "CS2", name: "CSE Sem 3 - Section A" },
];

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const defaultRequests = [
  { subjectIndex: 0, teacherIndex: 0, roomIndex: 0 },
  { subjectIndex: 1, teacherIndex: 1, roomIndex: 1 },
  { subjectIndex: 3, teacherIndex: 2, roomIndex: 2 },
  { subjectIndex: 2, teacherIndex: 0, roomIndex: 0 },
  { subjectIndex: 4, teacherIndex: 1, roomIndex: 1 },
];

let timetable = createEmptyGrid();

function createEmptyGrid() {
  return Array.from({ length: DAYS }, () =>
    Array.from({ length: SLOTS }, () => ({ isEmpty: true }))
  );
}

function initTimetable() {
  timetable = createEmptyGrid();
}

function hasClash(day, slot, teachIdx, roomIdx, batchIdx) {
  for (let d = 0; d < DAYS; d++) {
    for (let s = 0; s < SLOTS; s++) {
      if (d !== day || s !== slot) continue;
      const cell = timetable[d][s];
      if (cell.isEmpty) continue;

      if (cell.batchIndex === batchIdx) return true;
      if (cell.teacherIndex === teachIdx) return true;
      if (cell.roomIndex === roomIdx) return true;
    }
  }
  return false;
}

function placeClass(day, slot, subjIdx, teachIdx, roomIdx, batchIdx) {
  timetable[day][slot] = {
    subjectIndex: subjIdx,
    teacherIndex: teachIdx,
    roomIndex: roomIdx,
    batchIndex: batchIdx,
    isEmpty: false,
  };
}

function generateTimetable(requests, batchIdx) {
  initTimetable();
  const placed = [];
  const failed = [];

  for (const req of requests) {
    let scheduled = false;

    for (let d = 0; d < DAYS && !scheduled; d++) {
      for (let s = 0; s < SLOTS && !scheduled; s++) {
        if (timetable[d][s].isEmpty && !hasClash(d, s, req.teacherIndex, req.roomIndex, batchIdx)) {
          placeClass(d, s, req.subjectIndex, req.teacherIndex, req.roomIndex, batchIdx);
          placed.push({ ...req, day: d, slot: s });
          scheduled = true;
        }
      }
    }

    if (!scheduled) {
      failed.push(req);
    }
  }

  return { placed, failed };
}

function buildOptions(items, labelFn, valueKey = "index") {
  return items
    .map((item, index) => `<option value="${index}">${labelFn(item, index)}</option>`)
    .join("");
}

function createClassRow(request = { subjectIndex: 0, teacherIndex: 0, roomIndex: 0 }) {
  const row = document.createElement("div");
  row.className = "class-row";

  row.innerHTML = `
    <select class="subject-select" required>
      ${buildOptions(subjects, (s) => `${s.code} — ${s.name}`)}
    </select>
    <select class="teacher-select" required>
      ${buildOptions(teachers, (t) => t.name)}
    </select>
    <select class="room-select" required>
      ${buildOptions(rooms, (r) => `${r.id} (${r.type})`)}
    </select>
    <button type="button" class="btn icon remove-row" title="Remove class">×</button>
  `;

  row.querySelector(".subject-select").value = String(request.subjectIndex);
  row.querySelector(".teacher-select").value = String(request.teacherIndex);
  row.querySelector(".room-select").value = String(request.roomIndex);

  row.querySelector(".remove-row").addEventListener("click", () => {
    const list = document.getElementById("class-list");
    if (list.children.length > 1) {
      row.remove();
    }
  });

  return row;
}

function readClassRequests() {
  const rows = document.querySelectorAll(".class-row");
  return Array.from(rows).map((row) => ({
    subjectIndex: Number(row.querySelector(".subject-select").value),
    teacherIndex: Number(row.querySelector(".teacher-select").value),
    roomIndex: Number(row.querySelector(".room-select").value),
  }));
}

function renderTimetable() {
  const container = document.getElementById("timetable");
  const table = document.createElement("table");
  table.className = "timetable";

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `<th>Slot</th>${dayNames.map((day) => `<th>${day}</th>`).join("")}`;
  table.appendChild(headerRow);

  for (let s = 0; s < SLOTS; s++) {
    const row = document.createElement("tr");
    row.innerHTML = `<td class="slot-label">${s + 1}</td>`;

    for (let d = 0; d < DAYS; d++) {
      const cell = timetable[d][s];
      const td = document.createElement("td");

      if (cell.isEmpty) {
        td.className = "cell-empty";
        td.textContent = "—";
      } else {
        const subject = subjects[cell.subjectIndex];
        const teacher = teachers[cell.teacherIndex];
        const room = rooms[cell.roomIndex];
        const batch = batches[cell.batchIndex];
        const roomClass = room.type.toLowerCase() === "lab" ? "lab" : "lecture";

        td.innerHTML = `
          <div class="cell-filled ${roomClass}">
            <span class="code">${subject.code} · ${subject.name}</span>
            <span class="meta">${teacher.name}<br>${room.id} (${room.type}) · ${batch.name}</span>
          </div>
        `;
      }

      row.appendChild(td);
    }

    table.appendChild(row);
  }

  container.replaceChildren(table);
}

function showResult(placed, failed) {
  const panel = document.getElementById("result-panel");
  const status = document.getElementById("status-msg");
  const total = placed.length + failed.length;

  panel.classList.remove("hidden");

  if (failed.length === 0) {
    status.className = "status-msg success";
    status.textContent = `All ${total} classes were placed successfully.`;
  } else {
    status.className = "status-msg warning";
    const names = failed
      .map((req) => subjects[req.subjectIndex].code)
      .join(", ");
    status.textContent = `${placed.length} of ${total} classes placed. Could not fit: ${names}. Try removing a clash or add more free slots.`;
  }

  renderTimetable();
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupForm() {
  const batchSelect = document.getElementById("batch-select");
  batchSelect.innerHTML = buildOptions(batches, (b) => `${b.id} — ${b.name}`);

  const classList = document.getElementById("class-list");
  classList.replaceChildren();

  for (const req of defaultRequests) {
    classList.appendChild(createClassRow(req));
  }

  document.getElementById("add-class-btn").addEventListener("click", () => {
    classList.appendChild(createClassRow());
  });

  document.getElementById("planner-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const batchIdx = Number(batchSelect.value);
    const requests = readClassRequests();
    const { placed, failed } = generateTimetable(requests, batchIdx);
    showResult(placed, failed);
  });
}

setupForm();
