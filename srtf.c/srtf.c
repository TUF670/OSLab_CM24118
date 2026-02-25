#include <stdio.h>

int main(){
    int n=3;
    int at[3]={0,2,6};
    int bt[3]={10,20,30};
    int rt[3];
    int complete=0, t=0, min, shortest;
    int wt[3]={0};
    int context=0, prev=-1;

    for(int i=0;i<n;i++)
        rt[i]=bt[i];

    while(complete!=n){
        min=9999; shortest=-1;

        for(int i=0;i<n;i++){
            if(at[i]<=t && rt[i]>0 && rt[i]<min){
                min=rt[i];
                shortest=i;
            }
        }

        if(shortest==-1){
            t++;
            continue;
        }

        if(prev!=-1 && prev!=shortest)
            context++;

        prev=shortest;
        rt[shortest]--;
        t++;

        if(rt[shortest]==0){
            complete++;
            int finish=t;
            wt[shortest]=finish-at[shortest]-bt[shortest];
            if(wt[shortest]<0) wt[shortest]=0;
        }
    }

    float avg=0;
    printf("\nWaiting Times:\n");
    for(int i=0;i<n;i++){
        printf("P%d = %d\n",i+1,wt[i]);
        avg+=wt[i];
    }

    printf("Average Waiting Time = %.2f\n",avg/n);
    printf("Context Switches = %d\n",context);

    return 0;
}