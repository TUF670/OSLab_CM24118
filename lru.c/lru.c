#include <stdio.h>

int main() {
    int frames = 3;
    int pages[] = {1,2,3,4,1,2,5,1,2,3,4,5};
    int n = 12;

    int frame[3], time[3];
    int i, j, k, pos, min, count = 0, faults = 0;

    for(i=0;i<frames;i++) {
        frame[i] = -1;
    }

    for(i=0;i<n;i++) {
        int flag = 0;

        for(j=0;j<frames;j++) {
            if(frame[j] == pages[i]) {
                count++;
                time[j] = count;
                flag = 1;
                break;
            }
        }

        if(flag == 0) {
            faults++;
            min = time[0];
            pos = 0;

            for(j=1;j<frames;j++) {
                if(time[j] < min) {
                    min = time[j];
                    pos = j;
                }
            }

            frame[pos] = pages[i];
            count++;
            time[pos] = count;
        }
    }

    printf("Page Faults = %d\n", faults);
    printf("Page Hits = %d\n", n - faults);

    return 0;
}