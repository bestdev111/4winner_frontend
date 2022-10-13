import { CaretDownOutlined } from '@ant-design/icons';
const SportsTeamList = [
    {
        title: 'football',
        key: '0-0',
        children: [
            {
                title: 'International',
                key: '0-0-0',
            },
            {
                title: 'International Young',
                key: '0-0-1',
            },
            { title: 'England', key: '0-0-2' },
            { title: 'Spain', key: '0-0-3' },
            { title: 'Germany', key: '0-0-4' },
            { title: 'Italy', key: '0-0-5' },
            { title: 'France', key: '0-0-6' },
            { title: 'Turkey', key: '0-0-7' },
            { title: 'Holland', key: '0-0-8' },
            { title: 'Russia', key: '0-0-9' },
            { title: 'Portugal', key: '0-0-10' },
            { title: 'Belgium', key: '0-0-11' },
            { title: 'Algeria', key: '0-0-12' },
            { title: 'Argentina', key: '0-0-13' },
            { title: 'Australia', key: '0-0-14' },
            { title: 'Bolivia', key: '0-0-15' },
            { title: 'Brazil', key: '0-0-16' },
            { title: 'Bulgaria', key: '0-0-17' },
            { title: 'Chile', key: '0-0-18' },
            { title: 'Denmark', key: '0-0-19' },
            { title: 'Ecuador', key: '0-0-20' },
            { title: 'EI Salvador', key: '0-0-21' },
            { title: 'Finland', key: '0-0-22' },
            { title: 'Greece', key: '0-0-23' },
            { title: 'Guatemala', key: '0-0-24' },
            { title: 'India', key: '0-0-25' },
            { title: 'Iran', key: '0-0-26' },
            { title: 'Ireland', key: '0-0-27' },
            { title: 'Iceland', key: '0-0-28' },
            { title: 'Japan', key: '0-0-29' },
            { title: 'Colombia', key: '0-0-30' },
            { title: 'Croatia', key: '0-0-31' },
            { title: 'Kuwait', key: '0-0-32' },
            { title: 'Mexico', key: '0-0-33' },
            { title: 'Northem Ireland', key: '0-0-34' },
            { title: 'Norway', key: '0-0-35' },
            { title: 'Austria', key: '0-0-36' },
            { title: 'Paraguay', key: '0-0-37' },
            { title: 'Romania', key: '0-0-38' },
            { title: 'Scotland', key: '0-0-39' },
            { title: 'Sweden', key: '0-0-40' },
            { title: 'Switzerland', key: '0-0-41' },
            { title: 'Slovakia', key: '0-0-42' },
            { title: 'Slovenia', key: '0-0-43' },
            { title: 'South Korea', key: '0-0-44' },
            { title: 'Czech', key: '0-0-45' },
            { title: 'Tunisian', key: '0-0-46' },
            { title: 'Ukranie', key: '0-0-47' },
            { title: 'Hungary', key: '0-0-48' },
            { title: 'Uruguay', key: '0-0-49' },
            { title: 'USA', key: '0-0-50' },
            { title: 'Belarus', key: '0-0-51' },
            { title: 'Cyprus', key: '0-0-52' },
        ],
    },
];

export default SportsTeamList;
// const SportsTeamList = {
//     'Football': [
//         'International',
//         'International Young',
//         'International',
//         'England',
//         'Spain',
//         'Germany',
//         'Italy',
//         'France',
//         'Turkey',
//         'Holland',
//         'Russia',
//         'Portugal',
//         'Belgium',
//         'Algeria',
//         'Argentina',
//         'Australia',
//         'Bolivia',
//         'Brazil',
//         'Bulgaria',
//         'Chile',
//         'Denmark',
//         'Ecuador',
//         'EI Salvador',
//         'Finland',
//         'Greece',
//         'Guatemala',
//         'India',
//         'Iran',
//         'Ireland',
//         'Iceland',
//         'Japan',
//         'Colombia',
//         'Croatia',
//         'Kuwait',
//         'Mexico',
//         'Northem Ireland',
//         'Norway',
//         'Austria',
//         'Paraguay',
//         'Romania',
//         'Scotland',
//         'Sweden',
//         'Switzerland',
//         'Slovakia',
//         'Slovenia',
//         'South Korea',
//         'Czech',
//         'Tunisian',
//         'Ukranie',
//         'Hungary',
//         'Uruguay',
//         'USA',
//         'Belarus',
//         'Cyprus',
//     ],
//     'Tennis' : [

//     ],
//     'Basketball' : [

//     ],
//     'IceHockey' : [

//     ],
//     'Volleyball' : [

//     ],
//     'Handball' : [

//     ],
//     'Boxing' : [

//     ],
//     'Snooker' : [

//     ],
//     'Baseball' : [

//     ],
//     'American Football' : [

//     ],
// }
// export default SportsTeamList;

// const footballicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAZGSURBVFiFrVdrbFNlGH6+s9OyUSaspbu1lo6O6yaow7kZQYKBGC5y2wDxEjQRE8V4i4n+kegPTDRRSfCHGlTUCXjBQXDDyW04mLtA2daxsY2tbF3Zep3r9Zyecz5/aJetrT2F+CT9cd7vfZ/n6Zfve897CKUUqcBqtaZzHLf++x+r33a7PQaPdyzT6XQrAUCr1fDqrFk+jUY9uLNy0/vTpk07aTQaw6nwEjkDbrdbF4lE3qOUbqOUzrAODuGTA5/DNnxrSp5el4dX9+yG0XA3CCF+QsgPCoXiHY1GM3xHBmw2WwbLsu9KkrQHQMbkNY7n8fW3R/D72QsAgNWrVmDX0zswTamMpQkxDHNAEIS9er0+lLIBl8uVH4lETlBKS5K5//6HagDAzm2bkqWB5/krgiBsLCwstMWuMbEBu91+H8dxrXLiAKDLz4UuP1cuDQqF4v5gMNhqsViWJTXgcrnyKaW/EkLyZFlvA4QQqFSqnEgkctJisdyd0EBVVdVddvut2v9bPIqMjAywLJvjcDhPVVVV3RVnoH9w5NifrVeWpEpIKUXfjQH03RhAqldZpVKh9Wr74q7rA8enGPj555MLGy41rWrvuJYS0V/jPuz7cD9q686gtu4M9n24H3+N+2TrFAoFurp70NDY/MihQ4eLJgw0my8f9fn95Fp3D0RRTErS1tGJN97aC3ObZSJmbrPgjbf2oq2jU9ZEb18//IEAMVvajwBAmsFgyKz9vf5jURSJIIi4p2gRsrWz4wpFUUTV0WP44qsqhMNc3HqY4/DHxSZwHI/ixQvAMHEXDF3Xe1F35jxAgVGHU0sk/qO0NY9teMXcblkTTXK4vAhzPGbNzIRq+nQAwMioE/s++ASNTa2y//B6Tx+utllQXLQIM2aoAABOlxsXLjbj1Ol6OBwOUEohiiIxzZ3rS3vwoRX7+/oH8nNzsvHmay9i7ZpVcHm8OHW6Hu2WLtiG7dj/6RdwOF2y4lF4vGM4V38RTBqD+oYmtJo7MMegQ8XGtShaNB9d3T0IBEPIy8tVk+dfet1tKpij3r71cShjWql10IZPP/sKA9abKYtPRoFxDl564VkYDfqJmN/vh9frxYmaOgwN3/Kyz+/aGdDl56kTERgNeqxcXn7HBlYuL58iDgCSJEGpVKJi03qMOl1B5r/EoygrLQEh5LbFCSEoK43v5pNvWY52dlb8UY2BRp2FQlPBbRsoNBVAo86KiwuCMOWZIYSMypGVPXD/bRtIVMPzPCRJmngmhDgZSqm8gQRbeSc1HBfXPxwMwzDdcmQ52VoUGA0pixcYDcjJ1k6JUUoRCk2dSQghPQwhpDoV0rIHUt+FRLmBQCDupcWy7C9MKBSqI4T45UhLl90LpVIhK65UKlC67N4pMVEUEQgEpsQIIYHx8fEaQinFyMjIQUmSnktGfOSnE0hPT8c805ykBnpv3EQ4HMaOiscB/LP1Ho8n/vQzzHdLly59mlBK4Xa7dRzH9SJm+IziUtNlXOvuxXPPbAcj0xMkSvHlN0exeOE8PPRgCcbGxuIOH6U0PHPmzPkmk2mIAQCNRjPMMMyBRISDNjsaGluwo2KDrDgAMIRgR8UGNDS2oLPreqKTD5ZlPzOZTEPApKnYZrNltFxpa/N4vPOUCgWUSgUogMZmM7Zv3RDXUpPugiSh3XINx47XoOS+YhAAPC8gIkSgzlL3LyleeE9JSUkQANhokV6vD1XXnN567uy5y/YRhyLafhfML0xZPHrV/H4/8nK08Pl9OPj14Yl1nS43snr16k1RcSBmKt6ze1fH1i3r1s5WzxIEIQJKKW4ODsUdoFiIoohgMAiXywWfzwdKKQRBgG3YPpGTl6sVKresX7dn966OybVsLNnObdtOj4yOll74o7nBZrNPFyI8/mxuwZLiIqSlpYFlWUiSNPHjeT6hwZ6+fnBhHgCg1+cHVywvffipJ54wx+bFGQCA119+2Vy8oD27saW2+vyFS49euWoh80xzk+5CLDo6u5GZOYOuXF5+ZvGCss2VlSsT9hrZj9NDhw4X3Ry2Hdy4bk2xJEmqVMQJIYHjJ3/rLCyY++yTT1YmHbVlDURhtVrTA4HAOkEQNgOYTynNppRq/xV0AnAQQnpYlv1lfHy8pry8POHHaCz+Bivs37ZxOPN2AAAAAElFTkSuQmCC"


