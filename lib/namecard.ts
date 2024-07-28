import { MutableRefObject } from "react";
import { 
    Canvas,
    Circle,
    FabricImage,
    FabricText,
    Group,
    Rect,
} from "fabric";

// Function to create a rounded rectangle with specified parameters
const createRoundedRect = (
    width: number, 
    height: number, 
    fill: string, 
    left: number, 
    top: number,
) => {
    return new Rect({
        width: width,
        height: height,
        fill: fill,
        left: left,
        top: top,
        rx: 10, // horizontal radius for rounded corners
        ry: 10, // vertical radius for rounded corners
        stroke: "#D1DADB",
        strokeWidth: 2,
        originX: "center",
        originY: "center"
    });
}

// Function to create a text object with specified parameters
const createText = (
    text: string, 
    left: number,
    top: number, 
    fontSize = 16, 
    fontWeight = "normal",
) => {
    return new FabricText(text, {
        left: left,
        top: top,
        fontSize: fontSize,
        fontFamily: "Avenir",
        fontWeight: fontWeight,
        fill: "#20282D",
        textAlign: "center",
        originX: "center",
        originY: "center"
    });
}

// Function to create an image object from a URL with specified parameters
const createImage = async (
    url: string, 
    left: number, 
    top: number, 
    width: number, 
    height: number, 
    callback: any
) => {
    const image = await FabricImage.fromURL(
        url,
        { crossOrigin: "anonymous" },
        {
            left: left,
            top: top,
            width: width,
            height: height,
            clipPath: new Circle({ radius: width / 2, originX: "center", originY: "center" }),
            originX: "center",
            originY: "center"
        }
    );
    callback(image);
}

// Function to create an information circle with an icon and text
const createInfoCircle = async (
    iconUrl: string, 
    text: string, 
    left: number, 
    top: number
) => {
    const circle = new Circle({
        radius: 35,
        fill: "#f1f5f9",
        left: left,
        top: top,
        originX: "center",
        originY: "center"
    });

    const iconImage = await new Promise((resolve) => {
        const img = FabricImage.fromURL(
            iconUrl, 
            { crossOrigin: "anonymous" },
            {
                left: left,
                top: top - 10,
                originX: "center",
                originY: "center",
                scaleX: 0.3,
                scaleY: 0.3
            }
        );
        resolve(img);
    });

    const infoText = createText(text, left, top + 20, 16);

    return [circle, iconImage, infoText];
}

// Function to create a name card with user information
export const createNameCard = (
    avatar_url: string,
    name: string,
    login: string,
    bio: string,
    email: string,
    followers: number,
    public_repos: number,
    public_gists: number,
    html_url: string,
    index: number,
    fabricRef: MutableRefObject<Canvas | undefined>
) => {
    const cardWidth = 300;
    const cardHeight = 350;

    const left = 200 + Math.floor(index / 2) * (cardWidth + 20); // 20 for spacing
    const top = 200 + Math.floor(index % 2) * (cardHeight + 20); 

    const cardBackground = createRoundedRect(
        cardWidth, 
        cardHeight, 
        "white", 
        left + cardWidth / 2, 
        top + cardHeight / 2
    );

    createImage(
        avatar_url ? 
        avatar_url : 
        "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg", 
        left + cardWidth / 2, top + 70, 120, 120,
        async (avatarImg: any) => {
            const elements = [
                cardBackground,
                avatarImg
            ];

            if (login) elements.push(createText(login, left + cardWidth / 2, top + 160, 21, "bold"));
            if (name) elements.push(createText(name, left + cardWidth / 2, top + 190, 16));

            if (bio) elements.push(createText(`${bio.slice(0, 40)}`, left + cardWidth / 2, top + 220, 14));
            if (email) elements.push(createText(email, left + cardWidth / 2, top + 240, 14));

            const circleSpacing = 100;

            if (followers) {
                const followersElements = await createInfoCircle("/followers.svg", followers?.toString(), left + cardWidth / 2 - circleSpacing, top + 300);
                elements.push(...followersElements);
            }

            if (public_repos) {
                const reposElements = await createInfoCircle("/repo.svg", public_repos?.toString(), left + cardWidth / 2, top + 300);
                elements.push(...reposElements);
            }

            if (public_gists) {
                const gistsElements = await createInfoCircle("/gist.svg", public_gists?.toString(), left + cardWidth / 2 + circleSpacing, top + 300);
                elements.push(...gistsElements);
            }

            const group = new Group(elements, {
                left: left,
                top: top,
                selectable: true
            });

            group.on("selected", (event) => {
                if (event.e?.metaKey)
                    window.open(html_url);
            });

            fabricRef.current?.add(group);
            fabricRef.current?.renderAll();
        }
    );
}
