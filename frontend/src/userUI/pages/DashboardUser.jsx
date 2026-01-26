import React from "react";
import { useSelector } from "react-redux";

function DashboardUser() {
  // Correctly select the nested user object from the Redux state.
  const { user } = useSelector((state) => state.user);

  // If for any reason the user data isn't available yet, show a loading message.
  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <section className="user-dashboard-banner">
        <div className="banner-img">
          <img
            src="../../assets/media/hotel-banner-2.jpg"
            alt="User Dashboard"
          />
        </div>
      </section>
      <section>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, reiciendis excepturi officia voluptatum ex sit dicta blanditiis nisi voluptas minima ullam accusamus molestiae hic doloremque perspiciatis aliquam rem amet debitis nemo. Minima, porro unde. Nostrum quo nulla porro voluptatibus libero totam, repellat labore, magnam dignissimos eveniet, rerum inventore expedita veniam sit alias? Tenetur alias porro, molestias numquam iste aspernatur illo? Placeat iusto nostrum error similique eum sapiente unde dignissimos perferendis distinctio sequi quo blanditiis dolor quam nemo molestiae, nihil id architecto odit amet deserunt vero. Quia voluptatem ab maiores quibusdam recusandae sint ad doloremque, quasi ullam deserunt illum voluptatibus necessitatibus quam voluptates adipisci libero laudantium iste qui non sed eum cumque! Temporibus, et quia maxime quibusdam asperiores ut qui fugiat voluptatibus soluta fuga aliquid quo, ducimus eius rerum laborum. Eos a provident voluptatem autem nulla minus minima? Quidem, ipsa aperiam officia et similique reiciendis. Minus commodi quasi ad pariatur, provident est, repudiandae quidem ipsa quibusdam, rerum omnis corporis cumque excepturi quam voluptate veritatis? Minus optio harum rem necessitatibus officia porro vero nostrum illo atque saepe eum doloremque, hic earum aperiam minima iusto fugit tempore rerum, laudantium officiis libero tenetur. Deleniti impedit perspiciatis omnis illum nam earum mollitia perferendis nihil. Praesentium sequi dolore, aspernatur saepe fugiat dicta nemo harum id numquam nam quas ut hic sed quod deleniti quo quos aperiam nostrum debitis laboriosam quisquam vel nobis? Distinctio officiis tenetur quia voluptatum rerum! Repellat nobis maxime, fuga, expedita tenetur blanditiis eius ea animi delectus id eum temporibus. Iure ad, voluptatibus necessitatibus dolorum ea, iste corrupti, maxime omnis eaque amet incidunt magni autem soluta nobis dolore earum. Libero ullam dolores saepe officia facere, inventore incidunt ut corporis, cupiditate praesentium in nesciunt illo maiores sit dolorum aliquid atque labore aut. Quasi eum, voluptates excepturi aliquam dolores amet ea unde aspernatur aliquid in tenetur a veritatis numquam porro vel culpa quam accusamus reprehenderit temporibus voluptatum enim? Suscipit voluptatibus asperiores molestiae quo. Doloremque quas eligendi aliquam natus! Amet aspernatur tempora vel dolores sit culpa fuga dignissimos dolorem aliquam nulla quas nesciunt veniam est excepturi ducimus esse voluptatum, optio at doloribus debitis, aliquid et eos. Beatae eius expedita maxime ad aliquam deserunt modi molestiae ullam aliquid magnam, eos porro pariatur sequi veritatis officia quia unde fugit mollitia voluptas a officiis? Architecto quae earum dignissimos maiores exercitationem repellendus asperiores dicta aliquam consequatur iste labore iusto magnam repellat nobis mollitia ut, illo sequi facere voluptatibus ipsum iure hic voluptas. Assumenda consequatur cupiditate animi error laborum earum incidunt nam dolores amet tempore nisi, quibusdam harum nesciunt ad blanditiis consectetur possimus. Amet optio adipisci voluptates harum molestias temporibus dolorem iste assumenda fugit neque excepturi quia repellat illo ducimus nesciunt eaque error animi, in ipsum aliquam nam ratione ab mollitia sapiente. Repudiandae vero nihil sunt quidem dolorum? Consequatur quis, odio consectetur hic sed veniam delectus. Laboriosam, aperiam tempora? Voluptatum, ex. Vero ipsum deleniti consequuntur. Vel consequuntur, harum cupiditate explicabo, consectetur repellat accusantium aspernatur, fuga magnam veniam soluta possimus accusamus excepturi nulla sequi ab fugit numquam fugiat qui! Ex nam architecto quidem!</p>
      </section>
      <div className="bg-green-400 p-8">
        <h1 className="text-2xl font-bold">
          Hello, you are on the User Dashboard
        </h1>
        <p>ID: {user.id}</p>
        <p>
          Name: {user.firstname} {user.lastname}
        </p>
        <p>Mobile: {user.mobile}</p>
        <p>Email: {user.email}</p>
        <p>City: {user.city}</p>
      </div>
    </>
  );
}

export default DashboardUser;
