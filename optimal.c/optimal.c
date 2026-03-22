#include <stdio.h>

int main() {
    int frames = 3;
    int pages[] = {1,2,3,4,1,2,5,1,2,3,4,5};
    int n = 12;

    int frame[3];
    int i, j, k, pos, faults = 0;

    for(i=0;i<frames;i++)
        frame[i] = -1;

    for(i=0;i<n;i++) {
        int flag = 0;

        for(j=0;j<frames;j++) {
            if(frame[j] == pages[i]) {
                flag = 1;
                break;
            }
        }

        if(flag == 0) {
            faults++;

            int farthest = -1;
            pos = -1;

            for(j=0;j<frames;j++) {
                int found = 0;
                for(k=i+1;k<n;k++) {
                    if(frame[j] == pages[k]) {
                        if(k > farthest) {
                            farthest = k;
                            pos = j;
                        }
                        found = 1;
                        break;
                    }
                }
                if(found == 0) {
                    pos = j;
                    break;
                }
            }

            frame[pos] = pages[i];
        }
    }

    printf("Page Faults = %d\n", faults);
    printf("Page Hits = %d\n", n - faults);

    return 0;
}