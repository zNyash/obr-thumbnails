This is a small project I've made to generate thumbnails faster and more dynamic to my youtube [replays channel](https://www.youtube.com/@osuBrazilReplays)
It's a little bit scuffed because I didn't automated everything but its mostly good enough.

## How to use

1. Create a **`.env`** file with your `OSU_CLIENT_ID` and `OSU_CLIENT_SECRET` as shown in the `.env.example` and you can get these information like this:
	1. Go to your [account settings](https://osu.ppy.sh/home/account/edit)
	2. Scroll down until you find the **OAuth** tab
	3. Click on the button where it says "New OAuth Application"
	4. Choose whatever name you want it doesn't matter
	5. It'll show your Client ID and your Client Secret just copy it and paste on the `.env` file
2. Run `1 - build.bat` and wait until it closes
3. After running the first script, now run `2 - run-preview.bat` to start the app.
   Every time you need to use it just run the second script.
4. Choose you replay file on the left panel and fill the other fields if you want to.
5. Open developer tools and find this div that has an attribute `name` with the value `thumbnail` as shown: <img width="1220" height="881" alt="example1" src="https://github.com/user-attachments/assets/a1586f78-a940-4433-9859-4667ad560c43" />

6. Right click on it and click on `Capture Node Screenshot` option.

There we go, you just got yourself a good thumbnail for replays simple as that. (Not that simple actually.... I'm gonna automate everything eventually I swear...)
