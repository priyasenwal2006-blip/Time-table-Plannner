#include <stdio.h>
#include "timetable.h"

ClassSlot timetable[DAYS][SLOTS];

void initTimetable(void) {
    int d, s;
    for (d = 0; d < DAYS; d++) {
        for (s = 0; s < SLOTS; s++) {
            timetable[d][s].isEmpty = 1;
        }
    }
}

void placeClass(int day, int slot, int subjIdx, int teachIdx, int roomIdx, int batchIdx) {
    timetable[day][slot].subjectIndex = subjIdx;
    timetable[day][slot].teacherIndex = teachIdx;
    timetable[day][slot].roomIndex    = roomIdx;
    timetable[day][slot].batchIndex   = batchIdx;
    timetable[day][slot].isEmpty      = 0;
}

void placeSampleClasses(void) {
    placeClass(0, 0, 0, 0, 0, 0); /* Mon, slot 1: ET   - T01 - R101 - CS2 */
    placeClass(0, 1, 1, 1, 1, 0); /* Mon, slot 2: OS   - T02 - R102 - CS2 */
    placeClass(1, 2, 3, 2, 2, 0); /* Tue, slot 3: DSL  - T03 - LAB1 - CS2 */
    placeClass(2, 0, 2, 0, 0, 0); /* Wed, slot 1: CN   - T01 - R101 - CS2 */
    placeClass(3, 3, 4, 1, 1, 0); /* Thu, slot 4: MATH - T02 - R102 - CS2 */
}

void printTimetable(void) {
    int d, s;

    printf("\n================ WEEKLY TIMETABLE ================\n\n");

    printf("%-8s", "Slot");
    for (d = 0; d < DAYS; d++) {
        printf("%-12s", dayNames[d]);
    }
    printf("\n");

    for (s = 0; s < SLOTS; s++) {
        printf("%-8d", s + 1);
        for (d = 0; d < DAYS; d++) {
            if (timetable[d][s].isEmpty) {
                printf("%-12s", "---");
            } else {
                printf("%-12s", subjects[timetable[d][s].subjectIndex].code);
            }
        }
        printf("\n");
    }
}

void printLegend(void) {
    int i;

    printf("\n---------------- LEGEND ----------------\n");

    printf("Subjects:\n");
    for (i = 0; i < SUBJECT_COUNT; i++) {
        printf("  %-6s : %s\n", subjects[i].code, subjects[i].name);
    }

    printf("Teachers:\n");
    for (i = 0; i < TEACHER_COUNT; i++) {
        printf("  %-6s : %s\n", teachers[i].id, teachers[i].name);
    }

    printf("Rooms:\n");
    for (i = 0; i < ROOM_COUNT; i++) {
        printf("  %-6s : %s\n", rooms[i].id, rooms[i].type);
    }

    printf("Batches:\n");
    for (i = 0; i < BATCH_COUNT; i++) {
        printf("  %-6s : %s\n", batches[i].id, batches[i].name);
    }
}
