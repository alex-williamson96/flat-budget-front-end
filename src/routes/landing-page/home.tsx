import Header from "../../components/LandingPage/Header";
import useIsMobile from "../../hooks/useIsMobile";

const Home = () => {
    const { isMobile } = useIsMobile();

    let preview;

    if (isMobile) {
        preview =
            <div className="mockup-phone">
                <div className="camera"></div>
                <div className="display">
                    <div className="artboard artboard-demo phone-1">Hi.</div>
                </div>
            </div>
    } else {
        preview =
            <div className="mx-8 w-full">
                <div className="mockup-browser border bg-base-300">
                    <div className="mockup-browser-toolbar">
                        <div className="input">https://flatbudget.com</div>
                    </div>
                    <div className="flex justify-center px-4 py-16 bg-base-200">Hello!</div>
                </div>
            </div>
    }

    return (
        <div>
            <Header />
            <div className="text-6xl p-4 font-serif">
                No app, no paywall,<br />just a simple budget
            </div>
            <div className="flex flex-col">
                <p className="p-3">Sign up at no cost and experience an easy-to-use budget <br /> from your desktop or mobile browser.</p>
            </div>
            <div>
                <div className="carousel w-full">
                    <div id="slide1" className="carousel-item relative w-full">
                        {preview}
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        {preview}
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        {preview}
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        {preview}
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide3" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>
            </div>


        </div>)
}

export default Home;