import { Button} from "flowbite-react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-20 mt-[15rem] mr-[2rem] ml-[2rem]">
                    <h1 className="text-5xl sm:text-6xl font-bold tracking-wide text-center text-gray-800 drop-shadow-lg">Dobrodošli</h1>
      
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/polls">
                            <Button color="gray">Popis postojećih anketa</Button>
                        </Link>
                        <Link to="/addPoll">
                            <Button color="gray">Dodaj novu anketu</Button>
                        </Link>
                    </div>
            </div>
        </>
    );
}

export default Home;